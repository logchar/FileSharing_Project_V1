// pages/home/home.js
var globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading: false,
    docData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    app.initlogin().then((res)=>{this.getDocdata()})
    
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
    if (this.data.isloading === false) {
      this.setData({
        docData: [],
      })
      this.getDocdata()
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isloading === false){
      this.getDocdata()
      console.log(this.data.isloading)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 获取数据
   */
  getDocdata() {
    wx.showLoading({
      title: '加载中',
    })
    this.data.isloading = true
    console.log(Object.keys(this.data.docData).length)
    wx.request({
      url: globalData.url + 'checkfile/file_list/',
      method: 'GET',
      header: {
        "Authorization": globalData.token,
      },
      data: {
        "start_id": Object.keys(this.data.docData).length + 1 + ""
      },
      success: (res) => {
        this.setData({
          docData: this.data.docData.concat(res.data.data)
        })
      },
      complete: () => {
        this.data.isloading = false
        wx.hideLoading()
      }
    })
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/searchs/pages/home/search/search',
    })
  },
  gotochoose() {
    wx.navigateTo({
      url: '/searchs/pages/home/choose/choose',
    })
  },
})