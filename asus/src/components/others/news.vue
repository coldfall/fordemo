<template>
	<section class="big">
		<header>
		  	<span class="iconfont back" @click="goback()">&#xe60a;</span>
		  	<span class="title">热文推送</span>
		</header>
		<section class="bigbox">
			<p class="newstitle">把BMW装进游戏本里？</p>
			<p class="newstime">发布时间：2019-08-12 16:54:33</p>
			<p class="intr">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
			<p class="stitle">标题来源</p>
			<div v-for="(item,index) in st">
				<p class="stxt">{{item.stxt}}</p>
				<img :src="item.src" />
			</div>
			
			<div v-for="(item,index) in tt">
				<span class="tt">{{item.tit}}</span>
				<p class="intr">{{item.intr}}</p>
				<img :src="item.src" />
			</div>
		</section>
		
		<footer>
			<img src="../../../data/img/othersimg/btn.png" />
			<input  />
			<img src="../../../data/img/othersimg/send.png" />
		</footer>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				st:[],
				tt:[]
			}
		},
		mounted(){
			var _this = this;
			this.$http.get('./data/others.json')
				.then(function(res){
					_this.st = res.data.st;
					_this.tt = res.data.tt;
					
				})
				.catch((err)=>{
				})
				.then(function(){
				})
		},
		methods:{
			goback(){
				this.$router.replace('/index')
			}
		}
	}
</script>

<style scoped="scoped">
	.big{
		margin-bottom: 40px;
	}
	ul,li{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	header{
		width: 100%;
		overflow: hidden;
		padding: 10px 0 10px 0;
		box-sizing: border-box;
		max-width: 750px;
		margin: 0 auto;
		font-size: 19px;
		border-bottom: 1px solid #ebebeb;
	}
	.back{
		display: inline-block;
		float: left;
		padding-left: 10px;
		font-size: 18px;
	}
	.bigbox{
		margin: 0 12px;
	}
	.newstitle{
		font-size: 23px;
		font-weight: bold;
		text-align: left;
		margin: 10px 0 ;
	}
	.newstime{
		padding: 20px 0 ;
		text-align: left;
		color: #999;
		font-size: 18px;
	}
	.intr{
		text-align: left;
		font-size: 17px;
		font-family: BlinkMacSystemFont;
		color: #333333;
		line-height: 25px;
	}
	.stitle{
		font-weight: bold;
		color: #666666;
		font-size: 17px;
		padding: 30px 0 10px 0;
	}
	.stxt{
		text-align: left;
	}
	.bigbox img{
		width: 100%;
		padding: 5px 0 20px 0;
	}
	.tt{
		display: inline-block;
		font-size: 14px;
		font-weight: bold;
		background-color: #FFE500;
		color: #666666;
		margin-bottom: 5px;
	}
	footer{
		position: fixed;
		bottom: 0;
		background-color: #fff;
		width: 100%;
		border-top: 1px solid #ebebeb;
		max-width: 750px;
	}
	footer input{
		display: inline-block;
		height: 37px;
	    background-color: #eee;
	    border-radius: 25px;
	    box-sizing: border-box;
	    width: 70%;
	    border: none;
	    margin: 8px;
	}
	footer img{
		display: inline-block;
		width: 30px;
		margin-bottom: -10px;
	}
</style>
<style>
	body{
		margin: 0;
		padding: 0;
	}
	*{
		margin: 0 auto;
	}
</style>