export default {
  avatar: {
    title: '头像',
    tag: 'avatar',
    src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
  },
  username: {
    tag: 'input',
    holader: '请输入用户名',
    type: 'text',
    clearable: true,
    title: '用户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ]
  },
  password: {
    tag: 'input',
    holader: '请输入密码',
    type: 'password',
    showPassword: true,
    clearable: true,
    title: '密码',
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  },
  email: {
    holader: '请输入邮箱',
    tag: 'input',
    type: 'text',
    clearable: true,
    title: '邮箱',
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
      }
    ]
  },
  status: {
    tag: 'radio',
    title: '状态',
    rules: [{ required: true }]
  }
}
