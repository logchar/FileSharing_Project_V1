// searchs/pages/home/choose/choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: ["学院", "学科"],
    choosed: 0,
    departments: ["哲学",
      "经济学",
      "法学",
      "文学",
      "历史学",
      "数学",
      "医学",
      "工学",
      "管理学",
      "理学",
      "艺术学",
      "通识",
      "其它"
    ],
    subjects: [
      "哲学院",
      "国学院",
      "文学院",
      "外国语言文学学院",
      "新闻与传播学院",
      "艺术学院",
      "历史学院",
      "经济与管理学院",
      "法学院",
      "马克思主义学院",
      "社会学院",
      "政治与公共管理学院",
      "信息管理学院",
      "数学与统计学院",
      "物理科学与技术学院",
      "化学与分子科学学院",
      "生命科学学院",
      "资源与环境科学学院",
      "动力与机械学院",
      "电气与自动化学院",
      "城市设计学院",
      "土木建筑工程学院",
      "水利水电学院",
      "电子信息学院",
      "计算机学院",
      "测绘学院",
      "遥感信息工程学院",
      "网络安全学院",
      "医学部",
      "弘毅学堂",
      "其它"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  choose(e) {
    this.setData({
      choosed: e.currentTarget.dataset.info
    })
},

gotosearch(e){
const info = e.currentTarget.dataset.info
wx.navigateTo({
  url: '/searchs/pages/home/searchen/searchen?info=' + info,
})
}
})