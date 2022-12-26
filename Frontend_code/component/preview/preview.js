// component/preview/preview.js
var globalData = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    docData: {
      type: Object,
      value: {
      }
    },
    isShow: {
      type: Boolean,
      value: false
    },
    curPage: {
      type: String,
      value: ""
    }
  },
  observers: {
    'curPage': function (curPage) {
      var that = this;
      that.setData({
        pageType: curPage
      })
    },
    'docData': function(docData) {
      var that = this;
      that.setData({
        suffix: docData.suffix
      })
    }
    // 'docData': function (docData) {
    //   var that = this;
    //   that.setData({
    //     curDoc: docData.file_id
    //   })
    // }
  },
  /**
   * 组件的初始数据
   */
  data: {
    pageType: "",
    curDoc: 0,
    imgRoad:"",
    suffix:""
  },
  lifetimes:{
    attached:function(){
      if(this.data.suffix=="doc" || this.data.suffix=="docx"){
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/Document.svg"
        })
      }else if(this.data.suffix=="pdf"){
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/Pdf.svg"
        })
      }else if(this.data.suffix=="ppt"){
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/PowerPoint.svg"
        })
      }else if(this.data.suffix=="mp4" || this.data.suffix=="mp3"){
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/Video.svg"
        })
      }else if(this.data.suffix=="zip" || this.data.suffix=='rar'){
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/Zipped.svg"
        })
      }else{
        this.setData({
          imgRoad:"/Resources/DocumentAvatar/dontKnow.svg"
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    deleteItem: function () {
      var that = this;
      wx.showModal({
        title: "确定删除吗？",
        success: (res)=>
        {
          if (res.confirm) {
            if (that.data.pageType == "myUpload") {
              console.log("删除上传的文件");
              wx.request({
                url: globalData.url + "operation/delete_file/",
                method: "GET",
                header: {
                  "Authorization": globalData.token,
                  // "Content-Type": "multipart/form-data"
                },
                data: {
                  "file_id": that.data.docData.id
                },
                success:(res)=> {
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                  })
                  this.triggerEvent("deleted")
                }
              })
            }
          }
        }
      })
    },
    gotodetail: function (e) {
      wx.navigateTo({
        url: '/pages/detail/detail?detail=' + JSON.stringify(e.currentTarget.dataset.info) + '&imgRoad='+this.data.imgRoad,
      })
    },


  }
})