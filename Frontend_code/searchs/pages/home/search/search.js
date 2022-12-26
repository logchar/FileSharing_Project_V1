// searchs/pages/home/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputData: "",
    searchHistory: [],
    time: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: "searchHistory",
      success: (res) => {
        this.setData({
          searchHistory: res.data
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

  gotochoose() {
    wx.navigateTo({
      url: '/searchs/pages/home/choose/choose',
    })
  },

  getInput(e) {
    this.data.inputData = e.detail.value;
  },

  searchInput() {
    if (this.data.inputData === "") {
      return;
    } else {
      this.putHistory();
      wx.navigateTo({
        url: '/searchs/pages/home/searchen/searchen?info=' + this.data.inputData,
      })
    }
  },

  putHistory() {
    const that = this
    const index = that.data.searchHistory.findIndex((item) => item == that.data.inputData)
    if (index != -1) {
      this.data.searchHistory.splice(index, 1)
    }
    const temp = [this.data.inputData, ...this.data.searchHistory]
    temp.splice(6, 1)
    this.setData({
      searchHistory: temp
    })
    wx.setStorage({
      key: "searchHistory",
      data: that.data.searchHistory
    })
  },

  getHistory(e) {
    this.setData({
      inputData: this.data.inputData + e.currentTarget.dataset.info
    })
  },

  touchStart(e) {
    this.data.time = e.timeStamp
  },

  touchEnd(e) {
    this.data.time = e.timeStamp - this.data.time
    if (this.data.time <= 500) {
      this.getHistory(e)
    } else {
      wx.showModal({
        title: '删除',
        content: "请再次确认是否删除（" + e.currentTarget.dataset.info + "）历史记录",
        success: (res) => {
          if (res.confirm) {
            const index = this.data.searchHistory.findIndex((item) => item == e.currentTarget.dataset.info)
            const deleted = this.data.searchHistory
            if (index != -1) {
              deleted.splice(index, 1)
            }
            this.setData({
              searchHistory: deleted
            })
            wx.setStorage({
              key: "searchHistory",
              data: this.data.searchHistory
            })
          }
        }
      })
    }
  }
})