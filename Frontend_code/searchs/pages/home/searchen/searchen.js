// searchs/pages/home/searchen/searchen.js
var globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    docData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      info: options.info
    })
    this.doSearch()
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

  /**
   * 搜索函数
   */
  doSearch(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: globalData.url + 'operation/search_file',
      method: 'GET',
      header: {
        "Authorization": globalData.token
      },
      data: {
        "search_content": that.data.info
      },
      success: (res) => {
        this.setData({
          docData: res.data.data
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
})