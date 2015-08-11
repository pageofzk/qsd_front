(function(){
	var postsMod = angular.module("postsMod",[]);
	var postMod = angular.module("postMod",[]);
	var buysMod = angular.module("buysMod",[]);
	var newsMod = angular.module("newsMod",[]);
	postsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	buysMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	newsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	postMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");

	});
	postsMod.controller("postsCtrl",['$http', '$scope', function($http, $scope){
	  $scope.posts = [];


	  $scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.limit(10);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.posts = JSON.parse(JSON.stringify(results));;
	  			})
	  		}
	  	})
	  }

	  $scope.hotPosts = [];

	  $scope.gethotPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.descending("click");
	  	query.limit(6);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.hotPosts = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  $scope.gswap = false;
	  $scope.bswap = false;
	  $scope.cswap = false;
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			$scope.cswap = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var page = 1;                               //读取的页数         
	$scope.loading = 0;						//判断是否正在读取内容的变量
	function pushContent() {                    //核心是这个函数，向$scope.posts
	//添加内容          
	var Post = AV.Object.extend("Post");
	var query = new AV.Query(Post);
	query.descending("time");
	query.skip(10*page); 
	query.limit(10);
	$scope.$apply(function(){
	if ($scope.loading==0) {                         //如果页面没有正在读取
		$scope.loading = 1;                     //告知正在读取             
	  	query.find({						//调用API，读取第几页的内容                 
	  		success:function (results){
	  				posts = JSON.parse(JSON.stringify(results));
					if (posts.length != 0) {
						for (var i = 0; i <= posts.length - 1; i++) {                         
							$scope.posts.push(posts[i]);                     
						}
						page++;  						//翻页		
						$scope.loading = 0;        //告知读取结束
					} else {
						$scope.loading = 2;        //告知读取完毕
					}
					
	  		},
			error: function(error) {
			}
		})
	}
	})
	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		pushContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    $scope.gethotPosts();
	}]);
	
	buysMod.controller("buysCtrl",['$http', '$scope', function($http, $scope){
	  $scope.posts = [];


	  $scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "buy");
	  	query.limit(10);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.posts = JSON.parse(JSON.stringify(results));;
	  			})
	  		}
	  	})
	  }

	  $scope.hotPosts = [];

	  $scope.gethotPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "buy");
	  	query.descending("click");
	  	query.limit(6);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.hotPosts = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }

	  $scope.gswap = false;
	  $scope.bswap = false;
	  $scope.cswap = false;
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			$scope.cswap = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var page = 1;                               //读取的页数         
	$scope.loading = 0;						//判断是否正在读取内容的变量
	function pushContent() {                    //核心是这个函数，向$scope.posts
	//添加内容          
	var Post = AV.Object.extend("Post");
	var query = new AV.Query(Post);
	query.equalTo("doc_type", "buy");
	query.descending("time");
	query.skip(10*page); 
	query.limit(10);
	$scope.$apply(function(){
	if ($scope.loading==0) {                         //如果页面没有正在读取
		$scope.loading = 1;                     //告知正在读取             
	  	query.find({						//调用API，读取第几页的内容                 
	  		success:function (results){
	  				posts = JSON.parse(JSON.stringify(results));
					if (posts.length != 0) {
						for (var i = 0; i <= posts.length - 1; i++) {                         
							$scope.posts.push(posts[i]);                     
						}
						page++;  						//翻页		
						$scope.loading = 0;        //告知读取结束
					} else {
						$scope.loading = 2;        //告知读取完毕
					}
					
	  		},
			error: function(error) {
			}
		})
	}
	})
	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		pushContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    $scope.gethotPosts();
	}]);
	
	newsMod.controller("newsCtrl",['$http', '$scope', function($http, $scope){
	  $scope.posts = [];


	  $scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "news");
	  	query.limit(10);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.posts = JSON.parse(JSON.stringify(results));;
	  			})
	  		}
	  	})
	  }

	  $scope.hotPosts = [];

	  $scope.gethotPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "news");
	  	query.descending("click");
	  	query.limit(6);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.hotPosts = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }

	  $scope.gswap = false;
	  $scope.bswap = false;
	  $scope.cswap = false;
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			$scope.cswap = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var page = 1;                               //读取的页数         
	$scope.loading = 0;						//判断是否正在读取内容的变量
	function pushContent() {                    //核心是这个函数，向$scope.posts
	//添加内容          
	var Post = AV.Object.extend("Post");
	var query = new AV.Query(Post);
	query.equalTo("doc_type", "news");
	query.descending("time");
	query.skip(10*page); 
	query.limit(10);
	$scope.$apply(function(){
	if ($scope.loading==0) {                         //如果页面没有正在读取
		$scope.loading = 1;                     //告知正在读取             
	  	query.find({						//调用API，读取第几页的内容                 
	  		success:function (results){
	  				posts = JSON.parse(JSON.stringify(results));
					if (posts.length != 0) {
						for (var i = 0; i <= posts.length - 1; i++) {                         
							$scope.posts.push(posts[i]);                     
						}
						page++;  						//翻页		
						$scope.loading = 0;        //告知读取结束
					} else {
						$scope.loading = 2;        //告知读取完毕
					}
					
	  		},
			error: function(error) {
			}
		})
	}
	})
	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		pushContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    $scope.gethotPosts();
	}]);
	postMod.filter('trustHtml', function ($sce) {

        return function (input) {

            return $sce.trustAsHtml(input);

        }

    });
	postMod.controller("postCtrl",['$http', '$scope', function($http, $scope){

	  $scope.getPost = function(objectId) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.get(objectId, {
    			success: function(post) {
				// 成功，回调中可以取得这个 Post 对象的一个实例
				$scope.$apply(function(){
	  				$scope.post = JSON.parse(JSON.stringify(post));
	  			})
    			},
    			error: function(object, error) {
    			}
	  	});
	  }

	  $scope.gswap = false;
	  $scope.bswap = false;
	  $scope.cswap = false;
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	  $scope.hotPosts = [];

	  $scope.gethotPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.descending("click");
	  	query.limit(6);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.hotPosts = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  
	  $scope.updatePostClick = function(postParam) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
	  }
	  
	s=window.location.search.substr(1);
	params=s.split('&');
	var paramMap = new Map();
	for (i in params){
		param=params[i].split('=');
		paramMap.set(param[0],param[1]);
	}
	if (paramMap.get('id')==null || paramMap.get('id').length == 0)
		window.location.href='err.html';
    $scope.getPost(paramMap.get('id'));
	$scope.gethotPosts();
	}
	]);
})();

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?288976a40588d0b72643ed39573e39dd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();