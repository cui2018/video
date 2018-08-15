module.exports = new class extends Controller {
	constructor() {
		super();
		this.redis = LOAD.redis();
	}
	_index() {
		/*setTimeout( () => {
			this.redis.lrange("userZouMa", 0, 20, userZouMa => {
				this.redis.set("indexZouMa", userZouMa, over => {
					this._index();
				} );
			} );
		}, 5000 );*/
		let mysql = LOAD.mysql();
		let id = 1;
		echo(time());
		this.userplaygame(mysql, id);
	}
	gameontime(mysql,id){
		if( id == 358295){
			echo(time());
			mysql.close();
			return;
		}
		else mysql.sql(`SELECT starttime FROM vg_tg_gameontime WHERE id = ${id}`, res => {
			if( !res ){
				id++;
				this.gameontime(mysql, id);
			}
			else{
				mysql.update("tg_gameontime", {
					add_day : day(res[0].starttime)
				}, {
					id : id
				}, over => {
					id++;
					this.gameontime(mysql, id);
				} );
			}
		} );
	}
	user(mysql,id){
		if( id == 98683){
			echo(time());
			mysql.close();
			return;
		}
		else mysql.sql(`SELECT regtime FROM vg_user WHERE id = ${id}`, res => {
			if( !res ){
				id++;
				this.user(mysql, id);
			}
			else{
				mysql.update("user", {
					regtime_day : day(res[0].regtime)
				}, {
					id : id
				}, over => {
					id++;
					this.user(mysql, id);
				} );
			}
		} );
	}
	userplaygame(mysql,id){
		if( id == 178883 ){
			echo(time());
			mysql.close();
			return;
		}
		else mysql.sql(`SELECT frist_time FROM vg_userplaygame WHERE id = ${id}`, res => {
			if( !res ){
				id++;
				this.userplaygame(mysql, id);
			}
			else{
				mysql.update("userplaygame", {
					frist_day : day(res[0].frist_time)
				}, {
					id : id
				}, over => {
					id++;
					this.userplaygame(mysql, id);
				} );
			}
		} );
	}
}();