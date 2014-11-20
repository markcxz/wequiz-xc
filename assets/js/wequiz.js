jQuery.wequiz = {          
	loadQuiz:function() {		
		var url=$.wequiz.getDataUrl();
		$.ajax({
	        url: url,
	        type: "get",
	        dataType:"json",
	        success: function(json) {
	        	$.wequiz.applyQuizData(json);
	        },
	        error:function(xhr, status){
	        	$("#quiz-pkgDesc").html("加载试题数据出错啦，请您稍后重试，您也可以通过下方的QQ联系我们！");	
	        }
	    });
	},
	applyQuizData:function(quizPkg){
		$.templates({
		  quizTpl: '<div class="tab-pane" id="tab{{:#index+1}}"><div class="question-inner"><p>{{for subject tmpl="quizSubject" /}}</p><ul>{{for items tmpl="quizItem" /}}</ul><blockquote class="quiz-solving small alert-success hidden">{{:solving}}</blockquote></div></div>',
		  quizSubject:'<p>{{:#data}}<p/>',
		  quizItem: '<li><input data-quiz="{{:answer}}" name="quiz-{{:#parent.parent.index}}" id="quiz-{{:#parent.parent.index}}-{{:#index}}" type="radio"/><span class="glyphicon"></span><label for="quiz-{{:#parent.parent.index}}-{{:#index}}">{{:desc}}</label></li>',
		  quizTabTpl: '<li><a href="#tab{{:#index+1}}" data-toggle="tab">{{:#index+1}}</a></li>'
		});

		$("#quiz-pkgDate").html(quizPkg.date);	
		$("#quiz-pkgDesc").html(quizPkg.desc);		
		var tabHtml = $.render.quizTabTpl(quizPkg.quiz);
		var panehtml=$.render.quizTpl(quizPkg.quiz);
		$("#quiz-tab").html(tabHtml);
		$("#quiz-pane").html(panehtml);
	    $('#quizBtns').removeClass("hidden");    




        $(document).on("click", "input:radio", function(e) {
            var answer = $(this).data("quiz");
            var li=$(this).parent("li");
            var span=$(this).next("span");
            if(answer=="y"){
            	li.addClass("right");
            	span.addClass("glyphicon-ok");
            	li.parent("ul").next("blockquote").removeClass("hidden");
            }else{
            	li.addClass("wrong");
            	span.addClass("glyphicon-remove");
            }
        });


	  	$('#wq-quiz').bootstrapWizard({tabHeadSelector:"ul.wizard"
	  		,nextSelector:"#next"
	  		,previousSelector:"#prev"
	  		,onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length;
			var $current = index+1;
			var $percent = ($current/$total) * 100;
			$('#currText').html("第"+$current+"题，共"+$total+"题");			
			$('#progress-bar').css({width:$percent+'%'});
		}});

	},     
	bindAction:function() {

		$('#btnQuiz').on('click', function() {
	      $('#wq-cover').addClass("hidden");
	      $('#wq-quiz').removeClass("hidden");    
			$(".quiz-solving").each(function( index ) {
				$(this).addClass("hidden");
			});
	    });

		$('#quiz-home').on('click', function() {
	      $('#wq-cover').removeClass("hidden");
	      $('#wq-quiz').addClass("hidden");
	      return false;
	    });



		$('#chkSolving').on('change', function() {
	      	var show=$(this).is(':checked');			      
			$(".quiz-solving").each(function( index ) {
				if(show)
			  		$(this).removeClass("hidden");
			  	else
			  		$(this).addClass("hidden");
			});
	    });

	},
	getDataUrl:function() {
		var name="date";
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		var date="20141101";
		if (r != null) 
			date=unescape(r[2]); 
		return "data/"+date+".json"; 
	}        
};

(function ($) {
    $.fn.sharing = function () {
         $(document).on("click", "a[data-sharing],button[data-sharing]", function(e) {
            if (e) e.preventDefault();
            var type = $(this).data("sharing");
            var url=encodeURIComponent(location.href);
            var title=encodeURIComponent("时政微讯(sz-tips)公务员考试行测天天练。");
            if(type=="cnRenren"){
                 window.open("http://widget.renren.com/dialog/share?link="+url+"&title="+title);
            }else if(type=="cnDouban"){
                 window.open("http://www.douban.com/recommend/?url="+url+"&title="+title);
            }else if(type=="cnQzone"){
                 window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+title);
            }else if(type=="cnTqq"){
                 window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url="+url+"&title="+title);
            }else if(type=="cnTsina"){
                 window.open("http://service.weibo.com/share/share.php?url="+url+"&title="+title);
            }else if(type=="cnKanshou"){
                 window.open("http://kan.sohu.com/share/?url="+url+"&title="+title);
            }else if(type=="cnTsohu"){
                 window.open("http://t.sohu.com/third/post.jsp?url="+url+"&title="+title);
            }else{
                console.log(type);
            }      
        })
    };
})(jQuery);

