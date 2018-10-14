var mixin = {
  ajax:{
    data:{
      error:0, //エラー状態
      loading:true, //通信状態
      result:{} //取得結果格納用
    },
    methods:{
      getData:function(){
        var _this = this;
        _this.loading = true;
        $.ajax({
          url: _this.request.url,
          type: 'POST',
          dataType: 'JSON',
          timeout : 30000,
          data:_this.request.data
        })
        .done(function(response) {
          //結果をresultに格納、各種状態管理用の変数を完了ステータスに変更
          _this.error = 0;
          _this.loading = false;
          _this.result = response;
        })
        .fail(function(error) {
          //通信エラー時の再試行。
          //再試行回数が指定数に達した場合は状態管理用の変数を更新しAjaxを停止
          if(_this.error <= 5){
            _this.error++;
            _this.getData();
          }else{
            _this.error = true;
            _this.loading = false;
          }
        });
      }
    },
    mounted:function(){
      //Ajaxを実行
      this.getData();
    }
  }
}

var app = new Vue({
  el:'#app',
  mixins: [mixin.ajax],
  data:{
    request:{
      url:'//example.com/path/to/api/', //呼び出しurl
      data:{ //リクエストデータ
        date:'2017/12/31'
      }
    }
  }
});
