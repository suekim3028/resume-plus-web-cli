import * as amplitude from "@amplitude/analytics-browser";

type EventProp = {
  action?: string;
  label?: string;
  attributes?: Record<string, any>;
  value?: any;
};

class _EventLogger {
  public log<T extends EventKey>(event: T): (params: EventParams[T]) => void {
    return (params) => {
      const _props = factory[event](params);
      amplitude.track(event, _props);
      console.log(`[LogEvent] ${event} : ${JSON.stringify(_props)}`);
    };
  }
}

type EventParams = {
  global_navigation_bar_button: {
    action: "logo" | "서비스 안내" | "면접 연습" | "면접 결과" | "로그인";
  };
};

type EventKey = keyof EventParams;

const factory: { [k in EventKey]: (params: EventParams[k]) => EventProp } = {
  global_navigation_bar_button: ({ action }) => ({
    action,
  }),
};

export const EventLogger = new _EventLogger();
