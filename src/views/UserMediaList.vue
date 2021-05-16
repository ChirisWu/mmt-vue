<template>
  <div class="mmt_user_media_list">
    <div class="mmt_user_media_list_header">
      <h3>{{username}}'s {{type}}({{userVideos.length}})</h3>
      <div class="mmt_user_media_opt">
        <el-button plain size="small" round type="primary" @click="enableDelete">edit</el-button>
        <el-button plain size="small" round type="success" @click="disableDelete" v-if="deleteEnabled">done</el-button>
      </div>
    </div>
    <div class="mmt_user_videos_wrapper">
      <el-empty description="这里竟然是空的！" v-if="userVideos.length === 0"/>
      <div class="mmt_user_video_card_wrapper" v-for="(item, index) in userVideos">
        <video-card :video-vo="item" v-if="type === 'video'"/>
        <audio-card :audio-vo="item" v-else/>
        <div class="mmt_video_delete" v-if="deleteEnabled" @click="deleteMedia(item.id, item.title)">
          <br>
          <i class="el-icon-circle-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoCard from "@/components/media/VideoCard";
  import MmtVideoPlayer from "@/components/media/MmtVideoPlayer";
  import momentService from "@/api/moment";
  import AudioCard from "../components/media/AudioCard";
  import Constant from "../util/const";

  export default {
    name: "UserMediaList",

    components: {
      AudioCard,
      VideoCard,
      MmtVideoPlayer

    },
    data() {
      return {
        username: this.$route.params.username,
        type: this.$route.params.type,
        typeZh: Constant.mediaTypeZhMap.get(this.$route.params.type),
        userVideos: [],
        deleteEnable: false,
      }
    },
    computed: {
      deleteEnabled: {
        get() {
          return this.deleteEnable
        },
        set(value) {
          this.deleteEnable = value
        }
      }
    },
    methods: {
      getUserVideos() {
        momentService.getUserMedia(Constant.mediaTypeIdMap.get(this.type), this.$route.params.ud)
          .then(res => {
            console.log(res)
            if (res.data.status.statusCode === 200) {
              this.userVideos = res.data.data
            }
          }).catch(err => {
          console.log(err)
        })
      },
      enableDelete() {
        this.deleteEnabled = true
      },

      deleteMedia(id, title) {
        this.$confirm('are sure to delete' + title + 'it will never recover ', {
          confirmButtonText: 'delete',
          cancelButtonText: 'cancel',
          iconClass: 'el-icon-delete'
        }).then(() => {
          momentService.delete(id).then((res) => {
            if (res.status === 200) {
              this.deleteVideo(id)
              this.$alert('deleted', {
                type: 'success',
                confirmButtonText: 'ok'
              })
            }
          })
        })
      },
      disableDelete() {
        this.deleteEnabled = false
      },
      deleteVideo(id) {
        for (let i = 0; i < this.userVideos.length; i++) {
          if (this.userVideos[i].id === id) {
            this.userVideos.splice(i, 1)
            break;
          }
        }
      },
    },
    mounted() {
      this.getUserVideos()
    }


  }
</script>

<style scoped lang="less">

  .mmt_user_media_list {
    padding: 30px;

    .mmt_user_media_list_header {
      display: flex;
      height: 70px;

      h3 {
        flex: 1;
      }

      .mmt_user_media_opt {
        flex: 2;

        .el-button {
          margin-top: 15px;
        }
      }

    }

    .mmt_user_video_card_wrapper {
      height: 170px;
      width: 16.665%;
      float: left;
      position: relative;

      .mmt_video_delete {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(179, 23, 23, 0.2);
        display: none;
        text-align: center;
        font-size: 44px;
        color: #6d6c6c;

      }
    }

    .mmt_user_videos_wrapper {
      width: 100%;
      height: 999px;
    }

    .mmt_user_video_card_wrapper:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .mmt_video_delete {
        display: block;
      }
    }

  }

</style>