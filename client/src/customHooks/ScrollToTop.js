import { useEffect } from "react";
import { withRouter } from "react-router-dom";

// Custom component to always start at top of initially rendered page
function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
