// app.js
App({
  globalData: {
    'appid': 'wx984d508ce8f82e87',
    'url': 'https://api.resource.temp.ziqiang.net.cn/',
    'token': '',
    'favorities': [],
    "isdeleted": false
  },
  onLaunch() {
    // 登录

  },

  getfavorites() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.url + 'checkfile/collection_list/',
        method: "GET",
        header: {
          'Authorization': this.globalData.token
        },
        success: (res) => {
          this.globalData.favorities = [...res.data.data]
          console.log(this.globalData.favorities)
          resolve()
        }
      })
    })

  },

  delfavorites(file_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.url + 'operation/collection_delect/',
        method: "POST",
        header: {
          'Authorization': this.globalData.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'file_id': file_id
        },
        success: (res) => {
          if (res.data) {
            this.getfavorites().then(()=>{
              resolve()
            })
          } else {
            wx.showToast({
              title: '取消收藏失败',
              icon: 'error',
              duration: 1000,
              complete: () => {
                wx.hideToast()
              }
            })
          }
        }
      })
    })
  },

  dofav(file_id) {
    return new Promise((resolve,reject) => {
      wx.request({
        url: this.globalData.url + 'operation/collect_file/',
        method: 'GET',
        header: {
          'Authorization': this.globalData.token
        },
        data: {
          'file_id': file_id
        },
        success: (res) => {
          if (res.data) {
            this.getfavorites().then(()=>{
              resolve()
            })
          } else {
            wx.showToast({
              title: '取消收藏失败',
              icon: 'error',
              duration: 1000,
              complete: () => {
                wx.hideToast()
              }
            })
          }
        }
      })
    })
  },

  initlogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: this.globalData.url + 'login/',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                'code': res.code
              },
              success: (res) => {
                this.globalData.token = res.data.data.token
                this.getfavorites();
                resolve(res)
              }
            })
          } else {
            console.log("登录失败" + res.errMsg)
            reject(res)
          }
        }
      })


    })
  }
})