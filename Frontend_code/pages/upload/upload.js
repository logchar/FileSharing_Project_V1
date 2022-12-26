// pages/upload/upload.js
const globalData = getApp().globalData
const collages = [
  [{
      id: 1,
      name: '哲学院'
    },
    {
      id: 2,
      name: '国学院'
    },
    {
      id: 3,
      name: '文学院'
    },
    {
      id: 4,
      name: '外国语言文学学院'
    },
    {
      id: 5,
      name: '新闻与传播学院'
    },
    {
      id: 6,
      name: '艺术学院'
    },
    {
      id: 7,
      name: '历史学院'
    },
    {
      id: 8,
      name: '经济与管理学院'
    },
    {
      id: 9,
      name: '法学院'
    },
    {
      id: 10,
      name: '马克思主义学院'
    },
    {
      id: 11,
      name: '社会学院'
    },
    {
      id: 12,
      name: '政治与公共管理学院'
    },
    {
      id: 13,
      name: '信息管理学院'
    },
    {
      id: 14,
      name: '数学与统计学院'
    },
    {
      id: 15,
      name: '物理科学与技术学院'
    },
    {
      id: 16,
      name: '化学与分子科学学院'
    },
    {
      id: 17,
      name: '生命科学学院'
    },
    {
      id: 18,
      name: '土木建筑工程学院'
    },
    {
      id: 19,
      name: '水利水电学院'
    },
    {
      id: 20,
      name: '电子信息学院'
    },
    {
      id: 21,
      name: '计算机学院'
    },
    {
      id: 22,
      name: '测绘学院'
    },
    {
      id: 23,
      name: '遥感信息工程学院'
    },
    {
      id: 24,
      name: '网络安全学院'
    },
    {
      id: 25,
      name: '医学院'
    },
    {
      id: 26,
      name: '弘毅学堂'
    },
    {
      id: 27,
      name: '其他'
    },
  ],
  [{
      id: 111,
      name: '哲学'
    },
    {
      id: 112,
      name: '经济学'
    },
    {
      id: 113,
      name: '法学'
    },
    {
      id: 114,
      name: '文学'
    },
    {
      id: 115,
      name: '历史学'
    },
    {
      id: 116,
      name: '数学'
    },
    {
      id: 117,
      name: '医学'
    },
    {
      id: 118,
      name: '工学'
    },
    {
      id: 119,
      name: '管理学'
    },
    {
      id: 1110,
      name: '理学'
    },
    {
      id: 1111,
      name: '艺术学'
    },
    {
      id: 1112,
      name: '通识'
    },
    {
      id: 1113,
      name: '其他'
    },
  ]
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resChoices: collages,
    collageChosen: "请点击选择学院和学科",
    professionChosen: "",
    resName: "",
    resDetail: "",
    flies: [],
    uploadImgSrc:"/Resources/icon/svg/file-icon.svg",
    department: '',
    subject: '',
    isloading: false,
    download_progress: '0rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: "wechat",
      success: (res) => {
        this.setData({
          wechat: res.data
        })
      }
    })
    wx.getStorage({
      key: "qq",
      success: (res) => {
        this.setData({
          qq: res.data
        })
      }
    })
  },
  //获取选择器内容
  bindChange: function (e) {
    var i = e.detail.value;
    if (e.detail.column == 0) {
      //console.log(this);
      this.setData({
        collageChosen: collages[0][i].name
      })
    } else if (e.detail.column == 1) {
      //console.log(this);
      this.setData({
        professionChosen: collages[1][i].name
      })
    }
  },
  resSubmit() {
    if (this.data.flies.length == 0) {
      wx.showToast({
        title: '还未上传文件',
        icon: "error",
        duration: 1000,
      })
    } else if (this.data.resName == '') {
      wx.showToast({
        title: '还未填写标题',
        icon: "error",
        duration: 1000,
      })
    } else if (this.data.resDetail == '') {
      wx.showToast({
        title: '还未填写介绍',
        icon: "error",
        duration: 1000,
      })
    } else if (this.data.collageChosen=="" || this.data.professionChosen==""){
      wx.showToast({
        title: '还未填写学院学科',
        icon: "error",
        duration: 1000,
      })
    } else {
      const uploading = wx.uploadFile({
        url: globalData.url + 'operation/uploads_file/',
        filePath: this.data.flies[0].path,
        name: this.data.flies[0].name,
        header: {
          "Authorization": globalData.token,
          'Content-type': 'multipart/form-data'
        },
        formData: {
          "name": this.data.flies[0].name,
          "filename": this.data.resName,
          "readme": this.data.resDetail,
          "department": this.data.collageChosen,
          "subject": this.data.professionChosen
        },
        success: (res) => {
          if (res.data) {
            wx.showToast({
              title: '发布成功',
              icon: "success",
              duration: 1000,
            })
            //清除缓存刷新页面
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/upload/upload',
              })
            },1000)
          } else {
            wx.showToast({
              title: '发布失败',
              icon: "error",
              duration: 1000,
            })
          }
        },
        fail: (res)=>{
          console.log(res.errMsg)
        },
        complete:(res)=>{
            this.setData({
              isloading: false
            })
        }
      })
      this.setData({
        isloading: true
      })
      uploading.onProgressUpdate((res)=>{
        this.setData({
          upload_progress: res.progress*6.3 + 'rpx'
        })
      })

    }
  },
  getResName(e) {
    let nameStr = e.detail.value;
    this.setData({
      resName: nameStr
    })
  },
  getResDetail(e) {
    let detailStr = e.detail.value;
    this.setData({
      resDetail: detailStr
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  //文件上传
  getFile() {
    wx.chooseMessageFile({
      count: 10,
      success: (res) => {
        console.log(res.tempFiles)
        this.setData({
          flies: res.tempFiles,
          uploadImgSrc: "/Resources/icon/svg/uploadFileSuccess.svg"
        })
        wx.showToast({
          title: '上传成功',
          icon: "success",
          duration: 1000,
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '上传失败',
          icon: "error",
          duration: 1000,
        })
      }

    })
  }
})