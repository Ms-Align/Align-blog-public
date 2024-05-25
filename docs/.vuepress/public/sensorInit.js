// eslint-disable-next-line no-var, dot-notation
var sensors = window["sensorsDataAnalytic201505"];
sensors.init({
  server_url:
    "http://116.196.65.10/receiver/api/gp?project=clklogapp&token=5388ed7459ba4c4cad0c8693fb85630a",
  is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  use_client_time: true,
  show_log: true,
  send_type: "beacon",
  heatmap: {
    // eslint-disable-next-line spaced-comment
    //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: "default",
    // eslint-disable-next-line spaced-comment
    //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: "not_collect",
  },
});
sensors.quick("autoTrack");
