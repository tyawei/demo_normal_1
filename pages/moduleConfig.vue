<template>
  <el-dialog :title="configTitle" :visible.sync="visible" :close-on-click-modal="false"
             :before-close="closeDialog" :width="configType == 1? '800px':'1200px'" top="20px">
    <div>业务名称：{{configBusinessName}}</div>
    <div class="config_container" style="display: flex;">
      <!-- 左侧待选模块 -->
      <div class="left">
        <div class="left_title">待选模块</div>
        <div class="left_cont">
          <div class="item" v-for="item in waitModules" :key="item.id">
            <span class="inner">{{item.module_name}}</span>
            <i class="el-icon-caret-right left-icon" title="点击右移" @click="turnToRight(item)"></i>
          </div>  
        </div>
      </div>
      <div class="icon_change">
        <i class="el-icon-sort"></i>
      </div>
      <!-- 右侧必选模块 -->
      <div class="right">
        <div class="right_title">已选模块</div>
        <div class="right_cont" >
          <div class="item" v-for="item in configBaseModules" :key="item.id">
            <i class="el-icon-caret-left right-icon" title="点击左移" @click="turnToLeft(item)"></i>
            <span class="inner">{{item.module_name}}</span>
            <span class="btns">
              <el-button style="height: 38px" size="mini" type="default" :disabled="item.isFirst == 1? true:false"
                @click="jumpToTop(item)">置顶</el-button>
              <el-button style="height: 38px" size="mini" type="default" :disabled="item.isLast == 1? true:false"
                @click="jumpToBottom(item)">置底</el-button>
            </span>
          </div>
        </div>
      </div>
      <!-- 参数失败和业务失败 -->
      <div class="other" v-if="configType == 2">
        <div class="param_fail">
          <el-select v-model="param_fail" placeholder="请选择">
            <el-option size="mini" v-for="item in allModules" :key="item.id" :label="item.module_name" :value="item.param_fail">
            </el-option>
          </el-select>
        </div>
        <div class="business_fail">
          <el-select v-model="business_fail" placeholder="请选择">
            <el-option size="mini" v-for="item in allModules" :key="item.id" :label="item.module_name" :value="item.business_fail">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmConfig">保 存</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    configType: [Number, String], // 1 必选，2 最终
    configTitle: String,  // dialog的title
    configBusinessName: String, // 业务类型：自建开户  交易权限 business_name
    configId: [Number, String], // 列表过来的id
  },
  data() {
    return {
      visible: false,
      // 所有模块数据
      allModules: [
            {
                "id": 1,
                "module_name": "身份证上传",
                "module_type": "IdcardUpload",
                "itime": 1657161208506,
                "utime": 1657161208000,
                "isValidity": 0
            },
            {
                "id": 2,
                "module_name": "反洗钱",
                "module_type": "LaunderingBack",
                "itime": 1657161262289,
                "utime": 1657161262000,
                "isValidity": 0
            },
            {
                "id": 3,
                "module_name": "完善资料信息",
                "module_type": "AddInfo",
                "itime": 1657161274453,
                "utime": 1657161274000,
                "isValidity": 0
            },
            {
                "id": 4,
                "module_name": "签名照上传",
                "module_type": "HandSign",
                "itime": 1657161283515,
                "utime": 1657161283000,
                "isValidity": 0
            },
            {
                "id": 5,
                "module_name": "指定结算银行",
                "module_type": "SettleBank",
                "itime": 1657161291779,
                "utime": 1657161291000,
                "isValidity": 0
            },
            {
                "id": 6,
                "module_name": "适当性显示",
                "module_type": "DoneSuitably",
                "itime": 1657161303396,
                "utime": 1657161303000,
                "isValidity": 0
            },
            {
                "id": 7,
                "module_name": "适当性分类",
                "module_type": "Appropriateness",
                "itime": 1657161313701,
                "utime": 1657161313000,
                "isValidity": 0
            },
            {
                "id": 8,
                "module_name": "风险承受能力问卷",
                "module_type": "Question",
                "itime": 1657161325645,
                "utime": 1657161325000,
                "isValidity": 0
            },
            {
                "id": 9,
                "module_name": "风险测评结果",
                "module_type": "Echarts",
                "itime": 1657161391997,
                "utime": 1657161391000,
                "isValidity": 0
            },
            {
                "id": 10,
                "module_name": "模块测试1",
                "module_type": "moduleTest1",
                "itime": 1657161429320,
                "utime": 1657161741000,
                "isValidity": 0
            },
            {
                "id": 11,
                "module_name": "模块测试2",
                "module_type": "moduleTest2",
                "itime": 1657164414913,
                "utime": 1657164414000,
                "isValidity": 0
            },
            {
                "id": 12,
                "module_name": "模块测试3",
                "module_type": "moduleTest3",
                "itime": 1657164419589,
                "utime": 1657164419000,
                "isValidity": 0
            }
      ],
      // 已选模块
      baseModules: [
            {
                "id": 2,
                "business_type": "1",
                "module_type": "moduleTest1",
                "isFirst": 1,
                "isLast": 0,
                "itime": 1657164863383,
                "utime": 1657164863000,
                "isValidity": 0
            },
            {
                "id": 3,
                "business_type": "1",
                "module_type": "moduleTest2",
                "isFirst": 0,
                "isLast": 1,
                "itime": 1657164864855,
                "utime": 1657164864000,
                "isValidity": 0
            }
      ],
      // 
      modules: [
            {
                "id": 1,
                "business_type": "1",
                "module_type": "moduleTest1",
                "module_sort": "1",
                "param_fail": "SettleBank",
                "business_fail": "DoneSuitably",
                "itime": 1657175852491,
                "utime": 1657175852000,
                "isValidity": 0
            },
            {
                "id": 2,
                "business_type": "1",
                "module_type": "IdcardUpload",
                "module_sort": "2",
                "param_fail": "SettleBank",
                "business_fail": "DoneSuitably",
                "itime": 1657175853774,
                "utime": 1657175853000,
                "isValidity": 0
            },
            {
                "id": 3,
                "business_type": "1",
                "module_type": "LaunderingBack",
                "module_sort": "3",
                "param_fail": "SettleBank",
                "business_fail": "DoneSuitably",
                "itime": 1657175854666,
                "utime": 1657175854000,
                "isValidity": 0
            },
            {
                "id": 4,
                "business_type": "1",
                "module_type": "moduleTest2",
                "module_sort": "4",
                "param_fail": "SettleBank",
                "business_fail": "DoneSuitably",
                "itime": 1657175855541,
                "utime": 1657175855000,
                "isValidity": 0
            }
      ],

      param_fail: '',
      business_fail: '',

    }
  },
  computed: {
    // 获取 modules 里面 id和 module_name 的对应关系
    allModulesMap() {
      let map = {}
      this.allModules.length && this.allModules.forEach(item => {
        map[item.id] = item.module_name
      })
      return map
    },
    // 从 allModules 里面，拿到 module_name
    configBaseModules() {
      return this.baseModules.length? 
            this.baseModules.map((item, index) => {
              return { ...item, module_name: this.allModulesMap[item.id] }
            }) : []
    },
        // 从 allModules 里面，拿到 module_name
    configModules() {
      return this.modules.length? 
            this.modules.map((item, index) => {
              return { ...item, module_name: this.allModulesMap[item.id] }
            }) : []
    },
    waitModules() {
      let list = []
      const { allModules, configBaseModules } = this
      if ( allModules.length && configBaseModules.length ) {
        allModules.forEach((all, all_i) => {
          let isHas = false
          configBaseModules.forEach((base, base_i) => {
            if ( all.id === base.id ) {
              isHas = true
            }
          })
          if ( !isHas ) {
            list.push(all)
          }
        })
      } else {
        list = this.allModules
      }
      return list
    },
  },
  methods: {
    jumpToTop({ id }) {
      let index = 0
      for ( let i = 0; i < this.baseModules.length; i++ ) {
        let obj = this.baseModules[i]
        if ( id === obj.id ) {
          this.$set(this.baseModules, i, { ...obj, isFirst: 1, isLast: 0 })
          index = i
        } else if ( obj.isFirst == 1 ) {
          this.$set(this.baseModules, i, { ...obj, isFirst: 0})
        }
      }
      let clickOne = this.baseModules.splice(index, 1)
      console.log(clickOne)
      this.baseModules.unshift(clickOne[0])
    },
    jumpToBottom({ id }) {
      let index = 0
      for ( let i = 0; i < this.baseModules.length; i++ ) {
        let obj = this.baseModules[i]
        if ( id === obj.id ) {
          this.$set(this.baseModules, i, { ...obj, isFirst: 0, isLast: 1 })
          index = i
        } else if ( obj.isLast == 1 ) {
          this.$set(this.baseModules, i, { ...obj, isLast: 0})
        }
      }
      let clickOne = this.baseModules.splice(index, 1)
      this.baseModules.push(clickOne[0])
    },
    turnToLeft({ id }) {
      for ( let i = 0; i < this.baseModules.length; i++ ) {
        if ( id === this.baseModules[i].id ) {
          this.baseModules.splice(i, 1)
          break;
        }
      }
    },
    turnToRight({ id }) {
      for ( let i = 0; i < this.allModules.length; i++ ) {
        if ( id === this.allModules[i].id ) {
          this.baseModules.push(this.allModules[i])
          break;
        }
      }
    },
    // 供外层调用打开
    showConfig() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
  }
}
</script>
<style scoped lang="scss">
.left_title {
  line-height: 50px;
  text-align: center;
}
.left_cont, .right_cont {
  height: 400px;
  overflow: auto;
  padding: 10px 5px;
  border: 1px solid #ccc;
  .item {
    position: relative;
    margin: 10px auto 0;
    text-align: center;
    .left-icon, .right-icon {
      position: absolute;
      top: 5px;
      padding-left: 10px;
      display: none;
      font-size: 28px;
      cursor: pointer;
    }
    .inner {
      display: inline-block;
      width: 150px;
      border: 1px solid #ccc;
      line-height: 36px;
      text-align: center;
    }
  }
}
.left_cont {
  width: 280px;
  .item {
    width: 220px;
    .left-icon {
      right: 10px;
    }
    &:hover {
      .left-icon {
        display: inline-block;
      }
    }
  }
}
.right_cont {
  width: 320px;
  .item {
    .right-icon {
      left: -15px;
    }
    &:hover {
      .right-icon {
        display: inline-block;
      }
    }
  }
}
.icon_change {
  margin: 230px 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  text-align: center;
  transform: rotate(90deg);
}
.right_title {
  line-height: 50px;
  text-align: center;
}
.other {
  display: flex;
  margin-top: 50px;
  margin-left: 20px;
  .param_fail {
    margin-right: 20px;
  }
}
</style>