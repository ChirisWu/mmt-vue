<template>
    <div class="mmt_drag_upload">
        <el-upload
                drag
                :before-upload="beforeUpload"
                accept="video/mp4"
                :action="uploadUrl"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">
                    只能上传mp4文件，且不能超过400MB
                </div>
            </template>
        </el-upload>
        <el-alert class="mmt_upload_error_tips" v-if="uploadErrorTip"
                title="目前只支持mp4文件哦！"
                type="error"
                center
                show-icon>
        </el-alert>
    </div>
</template>

<script>
    import OssService from '@/api/oss'
    export default {
        name: "DragUpload",
        data () {
            return {
                ossUploadParam: {
                    policy: '',
                    signature: '',
                    key: '',
                    ossaccessKeyId: '',
                    dir: '',
                    host: '',
                },
                uploadUrl: OssService.OssUploadUrl,
                uploadErrorTip: false
            }
        },
        methods: {
            beforeUpload(file) {
                if (!this.filterFileType(file)){
                    console.log('only support mp4')
                    this.uploadErrorTip = true
                    return false
                }
            },
            filterFileType(file){
                let reg = /.*?.mp4$/
                return reg.test(file.name)
            }

        },

        mounted() {
            console.log(this.uploadUrl)
        }
    }
</script>

<style lang="less" scoped>
    .mmt_drag_upload{
        padding: 40px;
    }
</style>