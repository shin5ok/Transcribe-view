var mixin = {
  ajax:{
    data:{
      error:0, //�G���[���
      loading:true, //�ʐM���
      result:{} //�擾���ʊi�[�p
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
          //���ʂ�result�Ɋi�[�A�e���ԊǗ��p�̕ϐ��������X�e�[�^�X�ɕύX
          _this.error = 0;
          _this.loading = false;
          _this.result = response;
        })
        .fail(function(error) {
          //�ʐM�G���[���̍Ď��s�B
          //�Ď��s�񐔂��w�萔�ɒB�����ꍇ�͏�ԊǗ��p�̕ϐ����X�V��Ajax���~
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
      //Ajax�����s
      this.getData();
    }
  }
}

var app = new Vue({
  el:'#app',
  mixins: [mixin.ajax],
  data:{
    request:{
      url:'//example.com/path/to/api/', //�Ăяo��url
      data:{ //���N�G�X�g�f�[�^
        date:'2017/12/31'
      }
    }
  }
});
