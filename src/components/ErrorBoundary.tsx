import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/** Catches render-time errors so a single broken page never blanks the whole app. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Spark Labs render error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-paper px-6 text-center">
          <div className="max-w-md">
            <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
              Something broke
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink">
              This part of the lab hit an error.
            </h1>
            <p className="mt-3 text-[15px] text-mute">
              Sorry about that. Refreshing usually fixes it — or head back home.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-7 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
