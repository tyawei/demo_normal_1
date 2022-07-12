<template>
  <div class="container">
    <div>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item>
          <el-button style="margin-right: 50px" type="danger" @click="editModule('')">新建</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formData.module_name" placeholder="输入模块名称查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryModule(1, formData.pageSize)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%" center>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="module_name" label="模块名称"></el-table-column>
      <el-table-column prop="module_type" label="模块类型">

      </el-table-column>
      <!-- <el-table-column prop="name" label="模块说明"></el-table-column> -->
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <i class="el-icon-edit icon1" @click="editModule(scope.row)"></i>
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


    <el-dialog :title="(editForm.id? '编辑':'新增' )+'模块'" :visible.sync="editVisible" :close-on-click-modal="false"
               :before-close="closeEdit">
      <el-form :model="editForm" ref="editRef" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id" v-if="editForm.id">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="module_name">
          <el-input v-model="editForm.module_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块类型" prop="module_type">
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
          <el-input placeholder="创建后不可修改" :disabled="editForm.id? true:false" v-model="editForm.module_type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块说明" prop="module_remark">
          <el-input v-model="editForm.module_remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit">保 存</el-button>
        <el-button @click="closeEdit">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [
        { id: 11, module_name: '名称234', module_type: 'type_test', }
      ],
      total: 1, 
      formData: {
        module_name: '',
        pageNum: 1, 
        pageSize: 20,
      },
      editVisible: false,
      editForm: {},
      rules: {
        module_name: [
          { required: true, message: '请输入模块名称', trigger: ['blur', 'change'] },
        ],
        module_type: [
          { required: true, message: '请输入模块类型', trigger: ['blur', 'change'] }
        ],
      },

    }
  },
  methods: {
    editModule(row) {
      this.editVisible = true 
      this.editForm = row? { ...row } : {}

    },
    queryModule(pageNum, pageSize) {
      const data = {
        ...this.formData, 
        pageNum, 
        pageSize,
      }
      const url = ''

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
      this.queryModule(1, val)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryModule(val, this.formData.pageSize)
    },
  }
}
</script>