import * as amplitude from "@amplitude/analytics-browser";
import { VERSION } from "@constants";

type EventKey = "global_navigation_bar_button";

class _EventLogger {
  public log<T extends EventKey>(
    event: T,
    props: {
      action?: string;
      label?: string;
      attributes?: Record<string, any>;
      value?: any;
    }
  ) {
    const _props = {
      ...props,
      attributes: {
        ...(props?.attributes || {}),
        scene: "씬명",
        login: "Y",
        version: VERSION,
      },
    };
    amplitude.track(event, _props);
    console.log(`[LogEvent] ${event} : ${JSON.stringify(_props)}`);
  }
}

export const EventLogger = new _EventLogger();
