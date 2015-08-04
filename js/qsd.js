(function(){
	var module = angular.module("postMod",[]);
	module.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	module.controller("postCtrl",['$http', '$scope', function($http, $scope){
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

	  $scope.updatePostGood = function(postParam) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('good');
      		post.save();
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
	  }

	  $scope.updatePostBad = function(postParam) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('bad');
      		post.save();
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
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

    $scope.getPosts();
    $scope.gethotPosts();
	}]);
})();