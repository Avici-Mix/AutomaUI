<template>
  <el-dialog
    class="register"
    :title="$t('title')"
    :visible.sync="visible"
    width="40%"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-upload
      class="avatar-uploader"
      action=""
      :http-request="upload"
      :headers="headerObj"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <img
        v-else
        class="avatar-default"
        src="../../images/default_avatar.jpg"
      />
      <div class="tip">{{ $t("upload") }}</div>
    </el-upload>
    <el-form
      :rules="rules"
      class="form"
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
    >
      <el-form-item :label="$t('account')" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item :label="$t('nickname')" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <!-- <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item> -->
      <el-form-item :label="$t('password')" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('passwordConfirm')" prop="passwordConfirm">
        <el-input v-model="form.passwordConfirm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="submitForm(form)">{{
        $t("register")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { upload } from "../../service/upload.js";
export default {
  name: "register",
  data() {
    const $t = this.$t.bind(this);
    return {
      headerObj: {
        "Content-Type": "multipart/form-data"
      },
      imageUrl: "",
      visible: false,
      form: {
        nickname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        account: ""
      },
      rules: {
        account: [
          { required: true, message: $t("rules.noEmpty") },
          {
            min: 1,
            max: 18,
            message: $t("rules.nameLength"),
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: $t("rules.noEmpty") },
          {
            min: 1,
            max: 18,
            message: $t("rules.nameLength"),
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: $t("rules.noEmpty"), trigger: "blur" },
          {
            type: "email",
            message: $t("rules.correctEmail"),
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: $t("rules.noEmpty"),
            trigger: "blur"
          }
        ],
        passwordConfirm: [
          {
            required: true,
            message: $t("rules.noEmpty"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    upload(e) {
      let that = this;
      let formdata = new FormData();
      formdata.append("image", e.file);

      upload(formdata)
        .then(res => {
          if (res.success) {
            that.imageUrl = res.data;
          }
        })
        .catch(err => {
          that.$message({ message: err, type: "error", showClose: true });
        });
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt5M;
    },
    submitForm(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleRegister(form);
        } else {
          return;
        }
      });
    },
    async handleRegister(form) {
      const $t = this.$t.bind(this);
      const that = this;
      if (form.password != form.passwordConfirm) {
        this.$message.warning($t("rules.passwordDiff"));
        this.form.password = "";
        this.form.passwordConfirm = "";
      }
      const params = {
        nickname: form.nickname,
        password: form.password,
        account: form.account,
        avatar: that.imageUrl
      };
      try {
        that.$store
          .dispatch("register", params)
          .then(() => {
            that.$message({
              message: $t("registerSuccess"),
              type: "success",
              showClose: true
            });
            that.$store
              .dispatch("getUserInfo")
              .then(() => {})
              .catch(() => {
                that.$message({
                  type: "warning",
                  showClose: true,
                  message: $t("LoginDate")
                });
              });
            that.visible = false;
            that.$emit("closeLogin");
          })
          .catch(error => {
            if (error !== "error") {
              that.$message({ message: error, type: "error", showClose: true });
            }
          });
      } catch (error) {
        this.$message.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  font-size: 16px;
}

.register >>> .el-dialog__body {
  padding: 0 20px;
}

.avatar-uploader {
  text-align: center;
  .tip {
    font-size: 12px;
    margin-bottom: 14px;
    margin-top: 10px;
    color: #979595;
  }
}
.avatar,
.avatar-default {
  cursor: pointer;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

<i18n>
zh:
  title: 用户注册
  account: 账号
  nickname: 昵称
  email: 邮箱
  password: 密码
  passwordConfirm: 确认密码
  cancel: 取消
  register: 注册
  rules:
    noEmpty: 不能为空
    nameLength: 长度在 1 到 18 个字符
    correctEmail: 请输入正确的邮箱地址
    passwordDiff: 两次输入的密码不一致
  registerSuccess: 注册成功！
  LoginDate: 登录已过期
  upload: 点击上传头像
en:
  title: User Registration 
  nickname: nickname
  account: account
  email: email
  password: password
  passwordConfirm: comfirm password
  cancel: cancel
  register: register
  LoginDate: Login expired
  rules:
    noEmpty: can not be empty 
    nameLength: Contains 1 to 18 characters
    correctEmail: Please enter the correct email address
    passwordDiff: Entered passwords differ
  registerSuccess: registered successfully!
  upload: Click Upload profile picture
</i18n>
