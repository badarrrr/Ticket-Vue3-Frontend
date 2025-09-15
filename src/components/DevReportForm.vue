
<template>
  <el-card>
    <h4>Developer Report</h4>
    <el-form :model="form" label-position="top">
      <el-form-item label="Issue Type">
        <el-input v-model="form.issue_type" />
      </el-form-item>

      <el-form-item label="Root Cause">
        <el-input type="textarea" v-model="form.root_cause" rows="4" />
      </el-form-item>

      <el-form-item label="Self-test report (text)">
        <el-input type="textarea" v-model="form.self_test_report" rows="4" />
      </el-form-item>

      <el-form-item label="Self-test screenshots">
        <input type="file" multiple @change="onFiles" />
        <div v-if="files.length" style="margin-top:6px;">
          <div v-for="(f,i) in files" :key="i">{{ f.name }}</div>
        </div>
      </el-form-item>

      <el-form-item label="Regression Version">
        <el-input v-model="form.regression_version" />
      </el-form-item>

      <el-form-item label="Module">
        <el-input v-model="form.module" />
      </el-form-item>

      <el-form-item label="GitHub PR URL">
        <el-input v-model="form.github_pr_url" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="$emit('submit', form)">Submit to QA</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{}>
const emits = defineEmits(['submit'])

const form = reactive({
  issue_type: '',
  root_cause: '',
  self_test_report: '',
  regression_version: '',
  module: '',
  github_pr_url: ''
})
const files: File[] = []

function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  for (const f of Array.from(input.files)) {
    files.push(f)
  }
}
</script>
