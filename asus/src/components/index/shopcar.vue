<template>
	<main>
		<header>
		  	<mt-button icon="back" @click="goback()"></mt-button>
		  	<span>购物车</span>
		  	<p class="search"><img src="../../assets/img/index/icon-topsearch.png"/></p>
		</header>
		<section class="car_goods" v-for="(item,index) in shop">
			<div class="coupon">
				<span>领券</span>
			</div>
			<div class="product">
				<span :class={iconfont:true,check:true,checked:item.flag} @click="change(index),changenum()">&#xe613;</span>
				<img :src="item.src" />
				<div class="des">
					<p class="pro_text">{{item.text}}</p>
					<span class="price">￥</span><p class="price pri">{{item.price}}</p>
				</div>
				<p class="pro_num">
					<span>x</span><span class="num1">1</span>
				</p>
			</div>
			<div class="change">
				<span class="iconfont del" @click="del(index)">&#xe60b;</span>
				<p class="add"><span @click="add(item,-1)">-</span><span class="num">{{item.num}}</span><span @click="add(item,1)">+</span></p>
			</div>
			<div class="save">
				<p class="limitsave">{{item.limit}}</p>
				<p class="txt"><span>{{item.txt}}</span><span> {{item.txt1}}</span></p>
				<p class="txt"><span>{{item.txt}}</span><span> {{item.txt2}}</span></p>
			</div>
		</section>
		<section class="account">
			<span>共<span id="count">{{total1}}</span>件商品</span>
			<span>总计：</span><span class="money">￥</span><span class="money" id="money">{{price}}</span>
			<span class="cot">去结算</span>
		</section>
		<component :is="msg"></component>
	</main>
</template>

<script>
	import module from '../others/module.vue'
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				module:[],
				msg:"module",
				shop:[],
				total:0,
				totalprice:0
			}
		},
		computed: {
				total1(){
					return this.total;
				},
				price(){
					return this.totalprice;
				}
            },
		methods:{
			goback(){
				this.$router.go(-1)
			},
			change(index){
				this.shop[index].flag = !this.shop[index].flag;
			},
			add(obj,i){
				if(i==-1){
					obj.num--;
					if(obj.num<'1'){
						obj.num=1
						Toast('购物车为空!');
					}
				}
				else{
					obj.num++;
				}
				this.changenum();
			},
			changenum(){
				var _this = this;
				this.total = 0;
				this.totalprice = 0;
				for(var x=0;x<_this.shop.length;x++){
					if(this.shop[x].flag){
						_this.total += this.shop[x].num;
						_this.totalprice += this.shop[x].num*_this.shop[x].price;
					}
				}
			},
			del(i){
				this.shop.splice(i,1);
				this.num = 0;
				this.changenum();
			},
		},
		components:{
			'module':module
		},
		mounted(){
			var _this = this;
			this.$http.get('./data/data.json')
				.then(function(res){
					_this.shop = res.data.shop;
				})
				.catch((err)=>{
				})
				.then(function(){
				})
			}
	}
</script>

<style scoped="scoped">
	main{
		background-color: #eee;
		margin-bottom: 100px;
		overflow: hidden;
	}
	header{
		background-color: #e6e6e6;
		width: 100%;
		overflow: hidden;
		padding: 5px 0 5px 0;
	}
	.mint-button{
		float: left;
		background-color: #e6e6e6;
		box-shadow: none;
	}
	header span{
		display: inline-block;
		font-size: 20px;
		padding-top: 8px;
	}
	.search{
		display: inline-block;
		float: right;
		overflow: hidden;
	}
	.search img{
		display: inline-block;
		padding-right: 20px;
		padding-top: 12px;
	}
	.car_goods{
		background-color: #fff;
		margin-bottom: 6px;
	}
	.coupon{
		width: 100%;
		overflow: hidden;
		padding: 8px 20px 8px 20px;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
	}
	.coupon span{
		display: block;
		color: #f27070;
		float: right;
		font-size: 14px;
	}
	
	.product{
		padding: 20px 12px 20px 25px ;
		overflow: hidden;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	.check{
		display: inline-block;
		float: left;
		margin-top: 20px;
		font-size: 27px;
		color: gainsboro;
	}
	.checked{
		color: #00a8ff;
	}
	.product img{
		display: inline-block;
		float: left;
		width: 20%;
		padding-left: 12px;
	}
	
	.des{
		width: 40%;
		padding-left: 24px;
		float: left;
	}
	.price{
		display: inline-block;
		font-size: 14px;
		float: left;
		padding-top: 12px;
		color: red;
	}
	.pro_text{
		font-size: 14px;
		display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical; 
	    overflow: hidden;
   	 	text-overflow: ellipsis;
	}
	
	
	.pro_num{
		width: 10%;
		float: right;
		font-size: 14px;
	}
	.change{
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}
	.del{
		font-size: 18px;
		float: left;
		padding: 12px;
	}
	.add{
		width: 30%;
		float: right;
		overflow: hidden;
		padding-top: 10px;
		padding-right: 12px;
	}
	.add span{
		display: inline-block;
		width: 24px;
		height: 24px;
		border: 1px solid #b5b5b5;;
		line-height: 24px;
		font-size: 14px;
	}
	.add span:nth-of-type(2){
		width: 36px;
	}
	.save{
		overflow: hidden;
		width: 88%;
	}
	.save .limitsave{
		width: 100%;
		font-weight: bold;
		float: left;
		font-size: 15px;
		line-height: 36px;
	}
	.save p{
		float: left;
		text-align: left;
		line-height: 24px;
	}
	.save p span{
		font-size: 14px;
	}
	.save p span:nth-of-type(1){
		color: #C60808;
	}
	.account{
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 46px;
		left: 50%;
		overflow: hidden;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #bbb;
		max-width: 750px;
		transform: translateX(-50%);
	}
	.account>span{
		display: inline-block;
		font-size: 16px;
		padding-top: 12px;
	}
	.account>span:nth-of-type(1){
		float: left;
		padding-left: 16px;
	}
	.money{
		color: #f27070;
	}
	.cot{
		display: inline-block;
		background-color: #fe4140;
		color: #fff;
		text-align: center;
		font-size: 16px;
		padding: 14px 28px;
		float: right;
		font-weight: bold;
	}
</style>