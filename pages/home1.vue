<template>
  <div class="container">
    <div>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item>
          <el-button style="margin-right: 50px" type="danger" @click="editBusiness('')">新建</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formData.business_name" placeholder="输入业务名称查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryBusiness(1, formData.pageSize)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="syncBusiness">同步线上</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%" center>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="business_name" label="业务名称"></el-table-column>
      <el-table-column prop="business_type" label="业务类型">

      </el-table-column>
      <!-- <el-table-column prop="name" label="业务说明"></el-table-column> -->
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <i class="el-icon-edit icon1" @click="editBusiness(scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column label="必选模块设置">
        <template slot-scope="scope">
          <i class="el-icon-receiving icon1" @click="selectModuleConfig(scope.row, 1, '必选模块设置')"></i>
        </template>
      </el-table-column>
      <el-table-column label="模块最终配置">
        <template slot-scope="scope">
          <i class="el-icon-receiving icon1" @click="selectModuleConfig(scope.row, 2, '模块最终配置')"></i>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <i class="el-icon-delete icon1" @click="deleteModule(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="formData.pageNum" :page-size="formData.pageSize"
        :page-sizes="[20, 50, 100]" layout="sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog :title="(editForm.id? '编辑':'新增' )+'业务'" :visible.sync="editVisible" :close-on-click-modal="false"
               :before-close="closeEdit">
      <el-form :model="editForm" ref="editRef" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id" v-if="editForm.id">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务名称" prop="business_name">
          <el-input v-model="editForm.business_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务类型" prop="business_type">
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
          <el-input placeholder="创建后不可修改" :disabled="editForm.id? true:false" v-model="editForm.business_type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务说明" prop="business_remark">
          <el-input v-model="editForm.business_remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit">保 存</el-button>
        <el-button @click="closeEdit">取 消</el-button>
      </div>
    </el-dialog>

    <module-config ref="modCfgRef" 
                   :configType="configType"
                   :configTitle="configTitle"
                   :configBusinessName="configBusinessName"
                   :configId="configId"
                   >
    </module-config>

  </div>
</template>
<script>
import moduleConfig from './moduleConfig.vue'

export default {
  components: {
    moduleConfig,
  },
  data() {
    return {
      tableData: [
        { id: 11, business_name: '名称234', business_type: 'type_test', }
      ],
      total: 1, 
      formData: {
        business_name: '',
        pageNum: 1, 
        pageSize: 20,
      },
      editVisible: false,
      editForm: {},
      rules: {
        business_name: [
          { required: true, message: '请输入业务名称', trigger: ['blur', 'change'] },
        ],
        business_type: [
          { required: true, message: '请输入业务类型', trigger: ['blur', 'change'] }
        ],
      },
      // type 1是必选配置，2是最终配置
      configType: 1,
      // dialog的title，必选模块配置，最终模块配置
      configTitle: '',
      // 业务类型：自建开户、交易权限
      configBusinessName: '',
      // module 的 id
      configId: '',


    }
  },
  methods: {
    // 同步线上
    syncBusiness() {

    },
    editBusiness(row) {
      this.editVisible = true 
      this.editForm = row? { ...row } : {}

    },
    queryBusiness(pageNum, pageSize) {
      const data = {
        ...this.formData, 
        pageNum, 
        pageSize,
      }
      const url = ''

    },
    // 必选模块配置   最终模块配置
    selectModuleConfig({business_name, id}, type, typeName) {
      this.configType = type
      this.configTitle = typeName 
      this.configBusinessName = business_name
      this.configId = id
      this.$refs.modCfgRef.showConfig()

    },
    deleteModule(row) {

    },
    closeEdit() {
      this.editVisible = false 
      this.$refs.editRef.resetFields()
      this.editForm = {}
    },
    confirmEdit() {
      console.log('edit_form', { ...this.editForm })
      this.$refs.editRef.validate(valid => {
        console.log('valid', valid)



      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryBusiness(1, val)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryBusiness(val, this.formData.pageSize)
    },
  }
}
</script>