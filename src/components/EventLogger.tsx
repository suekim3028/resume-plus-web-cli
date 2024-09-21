import * as amplitude from "@amplitude/analytics-browser";

type EventProp = {
  action?: string;
  label?: string;
  attributes?: Record<string, any>;
  value?: any;
};

class _EventLogger {
  public log<T extends EventKey>(
    ..._value: EventParams[T] extends undefined ? [T] : [T, EventParams[T]]
  ) {
    {
      const [event, params] = _value;

      const defaultProps = {};
      const _props = params ? factory[event](params) : undefined;
      amplitude.track(event, { ...defaultProps, ..._props });
      console.log(`[LogEvent] ${event} : ${JSON.stringify(_props)}`);
    }
  }
}

type EventParams = {
  global_navigation_bar_button:
    | "logo"
    | "서비스 안내"
    | "면접 연습"
    | "면접 결과"
    | "로그인";
  global_navigation_bar_profile: "프로필" | "로그아웃";
  footer_button: "Service Guide" | "Privacy Policy" | "Survey";
  Home: undefined;
  home_main_banner_card: string;
  home_banner_card: "지금 면접 시작하기";
  LogIn: undefined;
  login_button: string;
  IdLogIn: undefined;
  id_login_button: "로그인" | "이메일/비밀번호 찾기" | "회원가입";
  SignUp: undefined;
  signup_button: "인증번호 받기" | "확인" | "중복확인" | "회원가입";
  InterviewSetting: undefined;
  interview_setting_button: {
    corp_name: string;
    occupation_name: string;
    job_name: string;
  };
  interview_setting_popup_button: "다시 입력" | "면접 시작";
  InterviewSettingLoading: undefined;
  InterviewSettingConfirm: undefined;
  interview_setting_confirm_button: string;
  EnvironmentCheck01: undefined;
  EnvironmentCheck02: undefined;
  EnvironmentCheck03: undefined;
  EnvironmentCheck04: undefined;
  environment_check_button: "다시하기" | "입장하기";
  WaitingRoom: undefined;
  Interview: undefined;
  interview_chat_button: undefined;
  interview_exit_button: undefined;
  interview_chat_send_button: string;
  interview_exit_popup_button: {
    action: "취소" | "면접 나가기";
    label: string;
  };
  interview_stop_popup_button: undefined;
  InterviewFinishPopUp: { popup_title: string };
  interview_finish_popup_button: { popup_title: string };
  InterviewResult: undefined;
  interview_result_card: {
    corp_name: string;
    occupation_name: string;
    job_name: string;
    score: number;
    interview_datetime: string;
  };
  InterviewResultDetail: {
    corp_name: string;
    occupation_name: string;
    job_name: string;
    score: number;
    interview_datetime: string;
  };
  interview_result_detail_card: {
    // TODO
    corp_name: string;
    occupation_name: string;
    job_name: string;
    score: number;
    interview_datetime: string;
    label: string;
    value: number;
  };
  Profile: undefined;
  profile_button: string;
};

type EventKey = keyof EventParams;

const actionOnly = (action: string) => ({ action });
const noParam = () => ({});
const labelOnly = (label: string) => ({ label });
const attributesOnly = (attributes: Record<string, any>) => ({ attributes });

const factory: { [k in EventKey]: (params: EventParams[k]) => EventProp } = {
  global_navigation_bar_button: actionOnly,
  global_navigation_bar_profile: actionOnly,
  footer_button: actionOnly,
  Home: noParam,
  home_main_banner_card: labelOnly,
  home_banner_card: labelOnly,
  LogIn: noParam,
  IdLogIn: noParam,
  login_button: noParam,
  id_login_button: actionOnly,
  SignUp: noParam,
  signup_button: actionOnly,
  InterviewSetting: noParam,
  interview_setting_button: attributesOnly,
  interview_setting_popup_button: actionOnly,
  InterviewSettingLoading: noParam,
  InterviewSettingConfirm: noParam,
  interview_setting_confirm_button: labelOnly,
  EnvironmentCheck01: noParam,
  EnvironmentCheck02: noParam,
  EnvironmentCheck03: noParam,
  EnvironmentCheck04: noParam,
  environment_check_button: actionOnly,
  WaitingRoom: noParam,
  Interview: noParam,
  interview_chat_button: noParam,
  interview_exit_button: noParam,
  interview_chat_send_button: labelOnly,
  interview_exit_popup_button: ({ action, label }) => ({
    action,
    label,
  }),
  interview_stop_popup_button: noParam,
  InterviewFinishPopUp: ({ popup_title }) => ({ label: popup_title }),
  interview_finish_popup_button: ({ popup_title }) => ({ label: popup_title }),
  InterviewResult: noParam,
  interview_result_card: attributesOnly,
  InterviewResultDetail: attributesOnly,
  interview_result_detail_card: attributesOnly, // TODO
  Profile: noParam,
  profile_button: labelOnly,
};

export const EventLogger = new _EventLogger();
