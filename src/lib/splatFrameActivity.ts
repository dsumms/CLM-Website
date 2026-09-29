type VisibilityDocument = Pick<Document, "hidden" | "addEventListener" | "removeEventListener">;
type FrameObserver = Pick<IntersectionObserver, "observe" | "disconnect">;
export type FrameObserverFactory = (onIntersectionChange: (intersecting: boolean) => void) => FrameObserver;

export function observeSplatFrameActivity(
    element: Element,
    doc: VisibilityDocument,
    createObserver: FrameObserverFactory | undefined,
    onActivityChange: (active: boolean) => void
): () => void {
    // An observer must confirm the first intersection before frames begin.
    let intersecting = !createObserver;
    let closed = false;
    let lastActive: boolean | undefined;

    const emit = () => {
        if (closed) return;
        const active = intersecting && !doc.hidden;
        if (active !== lastActive) {
            lastActive = active;
            onActivityChange(active);
        }
    };

    doc.addEventListener("visibilitychange", emit);

    let observer: FrameObserver | undefined;
    try {
        observer = createObserver?.((visible) => {
            intersecting = visible;
            emit();
        });
        observer?.observe(element);
    } catch {
        observer?.disconnect();
        observer = undefined;
        intersecting = true;
    }

    emit();

    return () => {
        closed = true;
        doc.removeEventListener("visibilitychange", emit);
        observer?.disconnect();
    };
}
