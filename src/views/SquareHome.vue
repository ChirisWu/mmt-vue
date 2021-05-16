<template>
  <div class="mmt_square_wrapper">
    <div class="mmt_square_top_wrapper">
      <h3 style="height: 60px; line-height: 60px; margin: 0;
                 border-top: solid rgb(213,213,213) 2px;
                 border-right: solid rgb(213,213,213) 2px;
                 color: #606266">
        specially recommend of today
      </h3>
      <el-carousel :interval="4000" type="card" height="288px">
        <el-carousel-item v-for="(vo, index) in carouselItems" >
          <carousel-card :carousel-card-vo="vo"/>
        </el-carousel-item>
      </el-carousel>
      <div style="height: 30px;
                  border-bottom: solid rgb(213,213,213) 2px;
                  border-left: solid rgb(213,213,213) 2px;"></div>
    </div>
    <div class="mmt_square_moments_wrapper">
      <div class="moments_opt_container">
        <div style="flex: 8">
        </div>
        <div class="moments_condition_opt">
          <el-tag size="small" effect="plain" type="primary">{{setting.type}} </el-tag>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-dropdown placement="bottom" size="small" class="moment_dropdown_menu">
            <span class="el-dropdown-link" style="font-size: 17px;"><i class="el-icon-more"/></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="changeType(3)">all</el-dropdown-item>
                  <el-dropdown-item @click="changeType(1)">video</el-dropdown-item>
                  <el-dropdown-item @click="changeType(2)">audio</el-dropdown-item>
                  <el-dropdown-item @click="changeOrder('views')">hottest</el-dropdown-item>
                  <el-dropdown-item @click="changeOrder('date')">newest</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </div>

      </div>
      <div class="moments_list">
        <div class="moment_item_wrapper" v-for="(item, index) in moments">
          <el-card>
            <moment-card :moment-vo="item"/>
          </el-card>
        </div>
      </div>
      <div class="moment_page_wrapper">
        <el-pagination
          @current-change="handlePageChange"
          :currentPage="page.current"
          :page-size="page.size"
          layout="total, prev, pager, next"
          :pager-count="page.pages"
          :total="page.total"
          :hide-on-single-page="true">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import CarouselCard from "../components/square/CarouselCard";
  import MomentCard from "../components/square/MomentCard";
  import momentService from "../api/moment";
  import Constant from "../util/const";

  export default {
    name: "SquareHome",
    components: {
      CarouselCard,
      MomentCard
    },
    data() {
      return {
        setting: {
          typeId: 3, // default video and audio
          order: momentService.ORDER_BY_VIEWS,
          type: ''
        },
        page: {
          current: 1,
          size: 10,
          pages: 1,
          total: 0
        },
        moments: [],
        carouselItems: [
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        ],
      }
    },
    computed: {
      noMore() {
        return this.count >= 20
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      handlePageChange(page) {
        this.getMoments(page)
      },
      getMoments(current = this.page.current, size = this.page.size) {
        momentService.getSquareMoments(current, size, this.setting.typeId, this.setting.order)
        .then(res => {
          let data = res.data.data
          this.moments = data.records
          this.page.total = data.total
          this.page.current = data.current
          this.page.pages = data.pages
          this.page.size = data.size
        })
      },
      changeType(value){
        this.setting.typeId = value
        this.setting.type = Constant.mediaIdTypeMap.get(this.setting.typeId)
        this.getMoments()
      },
      changeOrder(value){
        this.setting.order = value
        this.getMoments()
      },
      getCarousel(){
        momentService.getSquareCarouselVo().then(res => {
          this.carouselItems = res.data.data
        })
      },
      init() {
        this.setting.type = Constant.mediaIdTypeMap.get(this.setting.typeId)
      }
    },
    mounted() {
      this.init()
      this.getMoments()
      this.getCarousel()
    }
  }
</script>

<style scoped lang="less">
  .mmt_square_wrapper {
    padding: 20px 40px 0;

    .mmt_square_moments_wrapper {

      width: 100%;
      margin-top: 30px;
      .moments_opt_container {
        display: flex;
        height: 30px;
        width: 100%;

        .moments_condition_opt {
          flex: 1 1 auto;

          height: 100%;
          text-align: center;
          .el-dropdown-link {
            cursor: pointer;
          }

          .el-icon-arrow-down {
            font-size: 12px;
          }
        }
      }
      .moments_list{
        display: flex;
        flex-flow: row wrap;
        align-content: space-between;
        .moment_item_wrapper{
          width: 48%;
          margin: 20px 1% 0;
          font-size: 13px;
        }
      }
      .moment_page_wrapper{
        padding: 40px 20px;
      }
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>