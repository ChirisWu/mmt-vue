<template>
  <div class="mmt_user_setting_wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="account" name="account">
        <div class="setting_content_wrapper">
          <div class="avatar_upload_wrapper">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :data="ossUploadParam"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept="image/jpg, image/png, image/webp, image/jpeg"
              :multiple="false"
            >
              <img v-if="userInfos.avatar" :src="userInfos.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div style="font-size: 13px; color: #6d6c6c">upload new avatar</div>

          </div>
          <div class="account_infos_wrapper">
            <el-form ref="accountForm">
              <el-form-item>
                <label>name</label>
                <el-input v-model="userInfos.username" @keyup.enter="updateUsername">
                  <template #suffix>
                    <i v-if="updatingName" class="el-input__icon el-icon-loading"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <label>last sign in when</label>
                <el-input :disabled="true" v-model="userInfos.lastLoginTime"></el-input>
              </el-form-item>
              <el-form-item>
                <label>last sign in IP</label>
                <el-input :disabled="true" v-model="userInfos.lastLoginIp"></el-input>
              </el-form-item>
              <el-form-item>
                <label>register at</label>
                <el-input :disabled="true" v-model="userInfos.registerAt"></el-input>
              </el-form-item>

            </el-form>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="infos" name="infos">
        <div class="setting_content_wrapper">
          <el-form class="user_infos_form">
            <el-form-item>
              <label>birthday</label>
              <el-date-picker type="date" :placeholder="userInfos.birthday" v-model="userInfos.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <label>gender </label>
              <el-radio-group v-model="userInfos.gender" size="small">
                <el-radio border label="girl"></el-radio>
                <el-radio border label="boy"></el-radio>
                <el-radio border label="private"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <label>work/profession</label>
              <el-input v-model="userInfos.work"></el-input>
            </el-form-item>
            <el-form-item>
              <label>location</label>
              <el-input v-model="userInfos.location"></el-input>
            </el-form-item>
            <el-form-item>
              <label>personal url</label>
              <el-input v-model="userInfos.personalUrl"></el-input>
            </el-form-item>
            <el-form-item label="social">
              <el-row :gutter="6">
                <el-col :span="12">
                  <el-input placeholder="qq" v-model="userInfos.qq"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input placeholder="wechat" v-model="userInfos.wechat"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="updateUserInfos">save</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="secure" name="secure">
        <div class="setting_content_wrapper">
            <el-form class="secure_form">
              <h4 style="color: red">rest password</h4>
              <el-form-item label="new password">
                <el-input placeholder="new password, 6-20 number-alphabet"></el-input>
              </el-form-item>
              <el-form-item label="check password">
                <el-input placeholder="input new password for check"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" size="small">save</el-button>
              </el-form-item>
            </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ossService from "@/api/oss";
  import SingleImgUpload from "../upload/SingleImgUpload";
  import userService from "../../api/user";

  export default {
    name: "UserSettings",
    components: {
      SingleImgUpload
    },
    data() {
      return {
        activeName: 'account',
        ossUploadParam: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',

        },
        updatingName: false,
        fileKey: '',
        uploadUrl: ossService.OssUploadUrl,

        userInfos: {
          avatar: '',
          username: '',
          lastLoginTime: '2021-05-15 22:00:00',
          lastLoginIp: '192.168.14.23',
          registerAt: '',
          birthday: '',
          gender: 'boy',
          location: '',
          work: '',
          personalUrl: '',
          qq:'',
          wechat:''
        },

      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('please upload image');
        }
        if (!isLt2M) {
          this.$message.error('avatar should less than 2MB');
        }
        if (!(isJPG && isLt2M)) {
          return false
        }
        let _self = this;
        _self.fileKey = ossService.handleFilename(file.uid)
        return new Promise((resolve, reject) => {
          ossService.signature().then(response => {
            let data = response.data.data
            _self.ossUploadParam.policy = data.policy;
            _self.ossUploadParam.signature = data.signature;
            _self.ossUploadParam.ossaccessKeyId = data.accessid;
            _self.ossUploadParam.key = data.dir + '/' + _self.fileKey;
            _self.ossUploadParam.dir = data.dir;
            _self.ossUploadParam.host = data.host;
            resolve(true)
          }).catch(err => {
            this.notifyUploadError("network error！")
            reject(false)
          })
        })
      },
      handleAvatarSuccess(response, file) {
        this.userInfos.avatar = this.uploadUrl + '/' + this.ossUploadParam.dir + '/' + this.fileKey
        userService.uploadAvatar(this.userInfos.avatar)
        .then(() => {
          this.$store.commit('setCUAvatar', this.userInfos.avatar)
        })
      },
      getSettingPageVo(){
        userService.getSettingPageVO().then(res => {
          this.userInfos = res.data.data
          this.userInfos.avatar = this.$store.getters.cu_avatar
          this.userInfos.username = this.$store.getters.cu_username
        })
      },
      updateUsername(){
        this.updatingName = true
        userService.updateUsername(this.userInfos.username)
        .then(() => {
          this.$notify.success({
            message: 'username has updated',
            position: 'top-left',
            offset: 100,
          })
          this.updatingName = false
          this.$store.commit('setCurrentUsername', this.userInfos.username)
        }).catch(e => {
          this.updatingName = false
        })
      },
      updateUserInfos(){
        this.userInfos.birthday = this.dateFormat(this.userInfos.birthday)
        userService.updateUserInfos(this.userInfos)
        .then(() => {
          this.$notify.success({
            message: 'your new information has saved!',
            position: 'top-left',
            offset: 100,
          })
        })
      },
      dateFormat(date){
        try{
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          month = month < 10 ? '0' + month  : month
          let day = date.getDate()
          day = day < 10 ? '0' + day : day
          return year + '-' + month + '-' + day
        }catch (e) {
          return date.substring(0, 10)
        }

      }
    },
    mounted() {
      this.getSettingPageVo()
    }
  }
</script>

<style scoped lang="less">
  .mmt_user_setting_wrapper {
    padding: 50px 20px 0;
    position: relative;

    .setting_content_wrapper {
      width: 100%;
      display: flex;
      flex-flow: row wrap;

      .avatar_upload_wrapper {
        flex: 1 1 auto;
        width: 160px;
        height: 160px;

        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }

        .avatar {
          width: 150px;
          height: 150px;
          display: block;
        }
      }

      .account_infos_wrapper {
        flex: 5 5 auto;
        padding-bottom: 40px;
        .el-form {
          width: 200px;
        }
      }
      .user_infos_form{
        padding: 10px 20px 40px;
      }
      .secure_form{
        padding: 10px 20px 40px;
      }

    }
  }

</style>