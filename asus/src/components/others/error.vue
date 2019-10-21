<template>
	<section>
		<img src="../../../data/img/othersimg/wap_temp.jpg" />
	</section>
</template>

<script>
	export default {
		data() {
			return {
				count: "", 
			}
		},
		created() {
	
			this.goGrdoupRecor()
		},
		methods: {
			goGrdoupRecor() {
				const TIME_COUNT = 2;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
							this.$router.push({
								path: '/index'
							});
						}
					}, 1000)
				}
			},
		}
	}
</script>

<style scoped="scoped">
	img {
		width: 100%;
	}
</style>