<!-- 解析转发消息 -->
<script setup lang="ts">
import { FileItemShare } from '@/ts/base/model';
import { MessageType, IMessage } from '@/ts/core'
import { truncateString } from '@/utils/tools'
import { parseAvatar } from '@/ts/base'


const props = defineProps<{
  item: IMessage[]
  viewForward?: (item: IMessage[]) => void
}>()



/** 将链接转化为超链接 */
const linkText = (val: string) => {
  let reg = /(https?:\/\/[^\s]+)/g;
  return val.replace(reg, '<a target=_blank href="$1"> $1 </a>');
}

let formName = Array.from(
  new Set(props.item.map((msg: IMessage) => msg.from.name).filter((name: string) => name)),
)

let showName =
  formName && formName.length > 2
    ? '群聊'
    : `${formName[0]}${formName[1] ? '和' + formName[1] : ''}的`

// 默认只展示三条记录
const messages = props.item.slice(0, 3)
// 
messages.forEach((msg: IMessage) => {
  if (!msg.msgBody && msg.forward?.length) {
    msg = msg.forward[0];
  }
})

let img:FileItemShare = null
let file:FileItemShare = null
let url: string = null
let str: string = null
const handleMsg = (msg: IMessage) => {
  switch (msg.msgType) {
    case MessageType.Image: {
      img=parseAvatar(msg.msgBody)
      return true
    }
    case MessageType.File: {
      file=parseAvatar(msg.msgBody)
      return true
    }
    case MessageType.Voice: {
      const bytes = JSON.parse(msg.msgBody).bytes
      const blob = new Blob([new Uint8Array(bytes)], { type: 'audio/mpeg' })
      url = URL.createObjectURL(blob)
      return true
    }
    default: {
      // 包含图片
      if(msg.msgBody.includes('$IMG')){
        str = msg.msgBody;
        const matches = [...str.matchAll(/\$IMG\[([^\]]*)\]/g)];
        // 获取消息包含的图片地址
        // const imgUrls = matches.map((match) => match[1]);
        // 替换消息里 图片信息特殊字符
        const willReplaceStr = matches.map((match) => match[0]);
        willReplaceStr.forEach((strItem) => {
          str = str.replace(strItem, ' ');
        });
        return true
      }
      return true
    }
  }
}
</script>

<template>
<div class="con_content_forward_txt" @click="viewForward(item)">
  <div class="con_content_forward_session">{{`${showName}会话消息`}}</div>
  <template v-for="(msg, idx) in messages" :key="idx">
    <!-- 图片 -->
    <template v-if="msg.msgType===MessageType.Image && handleMsg(msg)">
      <div v-if="img" class="con_content_forward_msg">
        {{msg.from.name}}:{{img.name}}
      </div>   
      <div v-else class="con_content_forward_msg">消息异常</div>   
    </template>
    <!-- 文件 -->
    <template v-else-if="msg.msgType===MessageType.File && handleMsg(msg)">
      <div class="con_content_forward_msg">
        {{msg.from.name}}:{{file.name}}
      </div>
    </template>
    <!-- 语音 -->
    <template v-else-if="msg.msgType===MessageType.Voice && handleMsg(msg)">
      <div class="con_content_forward_msg">
        {{msg.from.name}}:{{url}}
      </div>    
    </template>
    <!-- 普通类型 -->
    <template v-else>
      <!-- 包含截图 -->
      <template v-if="msg.msgBody.includes('$IMG') && handleMsg(msg)">
        <div class="con_content_forward_msg">
          {{msg.from.name}}:【图片】{{str?.trim()}}
        </div>
      </template>
      <!-- 默认文本展示 -->
      <template v-else>
        <div class="con_content_forward_msg">
          <span>{{msg.from.name}}：</span>
          <span v-html="truncateString(linkText(msg.msgBody), 80)"></span>
        </div>
      </template>
    </template>
  </template>
</div>
</template>

<style lang="scss" scoped>
// @import '@cfg/theme/variables';
// :global {
//   .ogo-popover-content {
//     .ogo-popover-arrow {
//       display: none;
//     }
//     .ogo-popover-inner {
//       .ogo-popover-inner-content {
//         display: flex;
//         flex-direction: column;
//         padding: 2px 3px;
//       }
//     }
//   }
//   // .ogo-popover-placement-bottom {
//   //   margin-top: -20px;
//   // }
// }
.chart_content {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f2f2f2;
  position: relative;
}
.group_content_wrap {
  padding: 20px;
  transition: all 0.7s;
  .chats_space_Time {
    margin: 0 auto;
    text-align: center;

    span {
      border-radius: 4px;
      font-size: 12px;
      display: inline-block;
      border-radius: 4px;
      font-size: 12px;
      padding: 2px 8px;
      color: #a8abb2;
    }
  }

  .user_head_img_wrap {
    margin-right: 0;
  }

  .history_more {
    text-align: center;
    color: var(--el-color-primary);
  }

  .con_body {
    max-width: 40vw;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .con {
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    .con_img {
      height: 35px;
      width: 35px;
    }
    img {
      max-width: 100%;
      max-height: 400px;
    }
    .con_content {
      max-width: 50%;
      .name {
        font-size: 12px;
        padding-left: 4px;
        color: #888;
      }
      .con_content_txt, .con_content_forward_txt {
        cursor: pointer;
        text-align: left;
        min-height: 30px;
        padding: 10px 16px;
        margin: 0px 0px;
        color: black;
        border-radius: 6px;
        z-index: 1;
        font-size: small;
        word-wrap: break-word;
        word-break: normal;
        line-height: 15px;
      }

      .con_content_cite_txt {
        cursor: pointer;
        text-align: left;
        min-height: 30px;
        padding: 7px 10px;
        margin-top: 4px;
        color: black;
        border-radius: 6px;
        z-index: 1;
        max-width: 300px;
        word-break: normal;
        font-size: 12px;
        color: #8a8a8a;
        box-shadow: inset 0 0 2px #e9e9e9;
        background-color: #ebebeb;
        .emoji {
          width: 20px;
          height: 20px;
          margin: 5px;
        }
      }
      .con_content_forward_txt {
        color: rgb(70, 70, 70);
      }
      .con_content_forward_session {
        font-size: 14px;
        font-weight: 500;
        color: rgb(10, 10, 10);
        // border-left: 2px solid orange;
        padding-right: 2px;
        margin-bottom: 6px;
      }
      .con_content_forward_msg {
        padding: 3px;
      }
    }
  }

  .recall {
    font-size: 12px;
    justify-content: center;

    .reWrite {
      margin-left: 4px;
      cursor: pointer;
      color: #3e5ed8;
    }
  }

  .group_content_left {
    position: relative;
    .con_content {
      max-width: 100%;
      overflow: hidden;
      flex-direction: column;
      justify-content: flex-end;
      .con_content_txt, .con_content_forward_txt {
        background-color: white;
        max-width: 100%;
        box-shadow: inset 0 0 2px #cacaca;
      }
    }
  }

  .group_content_right {
    justify-content: flex-end;
    position: relative;
    .con_content {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      .con_content_txt, .con_content_forward_txt {
        background-color: #b4ccf9;
        margin-right: 10px;
        max-width: 100%;
        box-shadow: inset 0 0 2px #9292ff;
      }
      .information {
        padding-right: 10px;
        cursor: pointer;
        color: #3e5ed8;
        transform: scale(0.8);
        font-weight: 700;
      }
      .readed {
        color: #888;
      }
    }
    .multiSelectStyl {
      position: absolute;
      left: 0;
    }
  }

  .context_text_wrap {
    position: absolute;
    // background-color: var(--el-bg-color-overlay);
    width: 80px;
    height: max-content;
    border: 1px solid var(--el-box-shadow-lighter);
    z-index: 999;

    .context_menu_item {
      padding: 4px 6px;
      cursor: pointer;
      text-align: center;

      &:hover {
        // background-color: var(--el-bg-color-page);
      }
    }
  }
}
.moreInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: flex-start;

  li {
    padding: 10px 2px;
  }
}

.operate {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  align-content: flex-start;
}

.voiceStyle {
  audio {
    width: 200px;
    height: 40px;
    overflow-x: hidden;
  }

  audio::-webkit-media-controls-start-playback-button,
  audio::-webkit-media-controls-end-playback-button,
  audio::-webkit-media-controls-mute-button,
  audio::-webkit-media-controls-timeline,
  audio::-webkit-media-controls-volume-slider,
  audio::-webkit-media-controls-overflow-button {
    display: none !important;
  }
  /* 自定义时间显示样式 */
  audio.time-display {
    color: #666;
    font-size: 10px;
  }
}

.msgAction {
  display: flex;
}

.actionIconStyl {
  color: #666;
  cursor: pointer;
  margin: 0 4px;
}

// .actionIconStyl:hover {
//   // color: @primary-color;
// }

.moreActionWrap {
  display: flex;
  flex-direction: column;
  .multiBtn {
    display: flex;
    align-items: center;
    padding: 6px;
  }
  .moreActionTxt {
    font-size: 12px;
  }
}
.multiSelectStyl {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

</style>
