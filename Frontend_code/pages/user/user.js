var userData;
var globalData = getApp().globalData

Page({
  data: {
    userName: "用户名",
    userImg: ""
  },
  userOffLine: function () {
    wx.showActionSheet({
      alertText: "确定退出登录吗?",
      itemList: ['退出登录'],
      itemColor: "#FA5151",
      success: function (res) {
        console.log('userOffLine')
      }
    })
  },
  userCollections: function () {
    wx.navigateTo({
      url: '/users/pages/user/myfavorites/myfavorites',
    })
  },
  userDownloads: function () {
    wx.navigateTo({
      url: '/users/pages/user/mydownload/mydownload',
    })
  },
  userUploads: function () {
    wx.navigateTo({
      url: '/users/pages/user/myupload/myupload',
    })
  },
  userSelf: function () {
    wx.navigateTo({
      url: '/users/pages/user/userinfo/userinfo',
    })
  },
  onLoad() {

  },

  onShow() {
    var that = this;
    wx.request({
      url: globalData.url + 'checkfile/get_avatar/',
      method: "GET",
      header: {
        "Authorization": globalData.token
      },
      success(res) {
        var i = res.data;
        that.setData({
          userImg: globalData.url + i.data
        })
      }
    })
    wx.request({
      url: globalData.url + "checkfile/userinfo/",
      method: "GET",
      header: {
        "Authorization": globalData.token
      },
      success: (res) => {
        this.setData({
          userName: res.data.data.nickname
        })
      }
    })
  },

})