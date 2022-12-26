// users/pages/user/userinfo/userinfo.js
var globalData = getApp().globalData
Page({
  replyPhoto: function () {
    var that = this;
    wx.chooseMedia({
      count: 1,
      success: function (res) {
        var filePath = res.tempFiles[0].tempFilePath;
        //console.log(filePath)
        that.setData({
          profilePhotoPath: filePath,
          profilePhotoHidden: false
        });
        //前后端协作部分
        wx.uploadFile({
          filePath: that.data.profilePhotoPath,
          name: 'userAvatar',
          url: globalData.url + 'checkfile/updata_avatar/',
          header: {
            "Authorization": globalData.token,
            'Content-type': 'multipart/form-data'
          },
          formData:{},
          success:()=>{
            wx.showToast({
              title: '上传成功',
              icon: "success",
              duration: 1000,
            })
          } ,
          fail:()=>{
            wx.showToast({
              title: '上传失败',
              icon: "error",
              duration: 1000,
            })
          } 
        })
      },
      fail: function (error) {
        console.error("调用文件时出错"),
        console.warn(error),
        wx.showToast({
          title: '调用文件失败',
          icon: 'error',
          duration: 1000,
        })
      },
      complete: function () {

      }
    })
  },
  replyContact() {
    //前后端协作部分
    wx.showActionSheet({
      itemList: ['微信：' + this.data.wechat, 'QQ：' + this.data.qq],
      itemColor: "#000000",
      success: (res) => {
        if (res.tapIndex) {
          wx.showModal({
            title: '请输入您qq号',
            editable: true,
            placeholderText: '请输入',
            success: (res) => {
              if (res.confirm) {
                wx.request({
                  url: globalData.url+"checkfile/updata_QQ/",
                  method: "GET",
                  header: {
                    "Authorization": globalData.token,
                  },
                  data: {
                    "QQ":res.content
                  }
                })
                wx.setStorage({
                  key: 'qq',
                  data: res.content
                }).then(() => {
                  wx.getStorage({
                    key: "qq",
                    success: (res) => {
                      this.setData({
                        qq: res.data
                      })
                    }
                  })
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '请输入您微信号',
            editable: true,
            placeholderText: '请输入',
            success: (res) => {
              console.log(res)
              wx.request({
                url: globalData.url+"checkfile/updata_WeChat/",
                method: "GET",
                header: {
                  "Authorization": globalData.token,
                },
                data: {
                  "WeChat":res.content
                }
              })
              if (res.confirm) {
                wx.setStorage({
                  key: 'wechat',
                  data: res.content
                }).then(() => {
                  wx.getStorage({
                    key: "wechat",
                    success: (res) => {
                      this.setData({
                        wechat: res.data
                      })
                    }
                  })
                })
              }
            }
          })
        }
      }
    })
  },
  replyName: function () {
    wx.showModal({
      title: "请输入用户名",
      editable: true,
      placeholderText: "一个有趣的灵魂",
      success: (res)=>{
        if(res.confirm){
          this.setData({
            inputNameValue: res.content
          })
          var that=this;
          wx.request({
            url: globalData.url+"checkfile/updata_nickname/",
            method: "GET",
            header:{
              "Authorization": globalData.token,  
            },
            data:{
              "nickname":that.data.inputNameValue
            },
            success:(res)=>{
              wx.showToast({
                title: '修改成功',
                icon: "success",
                duration: 1000,
              })
            },
            fail:(res)=>{
              wx.showToast({
                title: '失败',
                icon: "error",
                duration: 1000,
              })
            }
          })
          //console.log(this.data.inputNameValue)
        }
      }
    })
  },
  getInputValue(e) {
    let str = e.detail;
    console.log(str);
  },
  inputRetrn: function () {
    this.setData({
      inputNameAppear: false
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    profilePhotoPath: '',
    profilePhotoHidden: false,
    inputNameValue: '',
    wechat: '',
    qq: ''
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

  }
})