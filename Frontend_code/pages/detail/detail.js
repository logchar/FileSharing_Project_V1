// pages/detail/detail.js
var app = getApp()
var globalData=app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docData: {},
    isfav: false,
    url: '',
    auth_detail: {},
    imgRoad: '',
    download_progress: '0rpx',
    isloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      docData: JSON.parse(options.detail),
      imgRoad: options.imgRoad
    })
    this.isfaved()
    wx.request({
      url: globalData.url + "checkfile/userinfo/",
      method: "GET",
      header: {
        "Authorization": globalData.token,
      },
      data:{
        "id": this.data.docData.auth_id
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          auth_detail: res.data.data
        })
      }
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

  changeFav() {
    if (this.data.isfav) {
      wx.showModal({
        title: '取消收藏',
        content: "请确认是否取消收藏(" + this.data.docData.name + ")",
        success: (res) => {
          if (res.confirm) {
            app.delfavorites(this.data.docData.id).then(() => {
              this.isfaved()
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '收藏',
        content: "请确认是否收藏(" + this.data.docData.name + ")",
        success: (res) => {
          if (res.confirm) {
            app.dofav(this.data.docData.id).then(() => {
              this.isfaved()
            })
          }
        }
      })
    }
  },

  getdownload() {
    this.itisafunc().then(()=>{
      wx.request({
        url: app.globalData.url+'operation/download_file/',
        method: "GET",
        header:{
          "Authorization":app.globalData.token
        },
        data:{
          "file_id": this.data.docData.id
        },
        success:(res)=>{
          console.log(res)
          this.setData({
            isloading:false
          })
        }
      })
    })
    },

  //判断是否被收藏
  isfaved() {
    this.setData({
      isfav: false
    })
    const fav = app.globalData.favorities
    fav.map((data) => {
      if (this.data.docData.id == data.id) {
        this.setData({
          isfav: true
        })
      }
    })
  },

  itisafunc(){
    return new Promise((resolve,reject)=>{
    const downloading = wx.downloadFile({
      url: this.data.docData.address,
      success: (res) => {
        this.setData({
          url: res.tempFilePath || res.filePath
        })
        wx.openDocument({
          filePath: this.data.url,
          success: (res) => {
            console.log('打开成功')
            resolve()
          }
        })
      }
    })
    this.setData({
      isloading:true
    })
    downloading.onProgressUpdate((res)=>{
      this.setData({
        download_progress: res.progress*6.3 + 'rpx'
      })
    })
    })
  },

  getconnect(){
    wx.showActionSheet({
      itemList: ['微信：' + this.data.auth_detail.WeChat, 'QQ：' + this.data.auth_detail.QQ],
    })
  }

})