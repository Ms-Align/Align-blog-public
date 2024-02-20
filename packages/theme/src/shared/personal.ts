/**
 * SNS items
 */

export type SNSItem =
  | {
      icon: string;
      link: string;
      iconScale?: number;
      text?:boolean //是否只展示不跳转
    }
  | string;

export interface SNS {
  [platform: string]: SNSItem;
}

export interface PersonalConfig {
  name: string;
  avatar: string;
  description: string;
  sns?: SNS;
}
