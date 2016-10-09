var vm = new Vue({
	el: '#all',
	data() {
		return {
			selected: null,
			arr_weekday: ["一", "二", "三", "四", "五", "六", "日"],
			arr_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			weeks: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
			show_all: true,
			show_year: true,
			show_month: true,
			show_week: true,
			show_day: true,
			curYear: '',
			left_year: '',
			left_month: '',
			left_week: '',
			left_day: '',
			right_year: '',
			right_month: '',
			right_week: '',
			initMonth: 1,
			firstTr: [],
			trs: [],
			lastTr: [],
			main_date: ''
		}
	},
	computed: {
		'mydate': function() {
			return new Date()
		},
		'startYear': function() {
			return this.mydate.getFullYear()
		},
		'startMonth': function() {
			return this.mydate.getMonth() + 1
		},
		'startDay': function() {
			return this.mydate.getDate()
		},
		'startWeekDay': function() {
			return new Date(this.startYear, this.startMonth - 1, 1).getDay()
		}
	},
	ready() {
		this.init()
		this.creatTbody()
	},
	watch: {
		'right_year': function() {
			this.creatTbody()
		},
		'right_month': function() {
			this.creatTbody()
		}
	},
	methods: {
		init: function() {
			var temp_day = this.mydate.getDay()
			
			this.left_year = this.mydate.getFullYear()
			this.left_month = this.mydate.getMonth() + 1
			if (temp_day == 0) {
				this.left_week = this.arr_weekday[6]
			} else {
				this.left_week = this.arr_weekday[temp_day - 1]
			}
			this.left_day = this.mydate.getDate()
			this.right_year = this.mydate.getFullYear()
			this.right_month = this.mydate.getMonth() + 1

			this.curYear = this.mydate.getFullYear()

			this.selected = this.startDay

		},
		show_main: function() {
			this.show_all = !this.show_all
				//alert(this.left_month);

		},
		left_years: function() {
			if (this.left_year != "去选月" && this.left_year != "去选年") {

				this.show_year = !this.show_year
				this.show_week = !this.show_week
				this.show_day = !this.show_day
				this.left_year = "去选月"
			} else if (this.left_year == "去选月") {

				this.show_year = !this.show_year
				this.show_month = !this.show_month
				this.left_year = "去选年"
			} else if (this.left_year == "去选年") {

				this.show_month = !this.show_month
				this.show_year = !this.show_year
				this.left_year = "去选月"
			}
		},
		year_up: function() {
			this.curYear = this.curYear - 10
		},
		year_down: function() {
			this.curYear = this.curYear + 10
		},
		choose_left_year: function(event) {
			this.left_year = parseInt(event.target.innerText)
			this.right_year = parseInt(event.target.innerText)
			this.show_year = !this.show_year
			this.show_week = !this.show_week
			this.show_day = !this.show_day
			var temp_day = new Date(this.left_year, this.right_month - 1, this.left_day).getDay()

			if (temp_day == 0) {
				this.left_week = this.arr_weekday[6]
			} else {
				this.left_week = this.arr_weekday[temp_day - 1]
			}
		},
		choose_left_month: function(event) {
			this.left_year = this.right_year
			this.left_month = parseInt(event.target.innerText)
			this.right_month = parseInt(event.target.innerText)
			this.show_month = !this.show_month
			this.show_week = !this.show_week
			this.show_day = !this.show_day

			var temp_day = new Date(this.left_year, this.right_month - 1, this.left_day).getDay()

			if (temp_day == 0) {
				this.left_week = this.arr_weekday[6]
			} else {
				this.left_week = this.arr_weekday[temp_day - 1]
			}
		},
		month_prev: function() {
			var prev_day = new Date(this.right_year, this.right_month - 2, this.left_day).getDay()

			if (this.right_month == 1) {
				this.right_month = 12
				this.right_year = this.right_year - 1
				if (this.left_year != '去选年' && this.left_year != '去选月') {
					this.left_year = this.right_year
				}

			} else {
				this.right_month = this.right_month - 1
			}

			this.left_month = this.right_month
			if (prev_day == 0) {
				this.left_week = this.arr_weekday[6]
			} else {
				this.left_week = this.arr_weekday[prev_day - 1]
			}

		},
		month_next: function() {
			var next_day = new Date(this.right_year, this.right_month, this.left_day).getDay()
				//alert(next_day)
			if (this.right_month < 12) {
				this.right_month = this.right_month + 1

			} else {
				this.right_month = 1
				this.right_year = this.right_year + 1
				if (this.left_year != '去选年' && this.left_year != '去选月') {
					this.left_year = this.right_year
				}
				
			}
			this.left_month = this.right_month

			if (next_day == 0) {
				this.left_week = this.arr_weekday[6]
			} else {
				this.left_week = this.arr_weekday[next_day - 1]
			}
		},
		creatTbody: function(event) {
			this.firstTr = []
			this.trs = []
			this.lastTr = []



			var yearStart = this.right_year
			var monthStart = this.right_month
			var dayStart = 1
				/*var dayPrev = new Date(yearStart, monthStart - 1).getDay()*/
				//alert(new Date(2017, 0, 1).getDay())
			var dateNum = new Date(yearStart, monthStart - 1, 1).getDay()
			var next_dateNum = new Date(yearStart, monthStart, 1).getDay()

			for (var i = 0; i < dateNum; i++) {
				this.firstTr.push('')
			}

			for (var i = 0; i < 7 - dateNum; i++) {
				this.firstTr.push(dayStart++)
			}
			
			if (dateNum == 6 || next_dateNum == 1 || next_dateNum == 0) {
				for (var i = 0; i < 4; i++) {
					this.trs[i] = []
					for (var j = 0; j < 7; j++) {
						this.trs[i].push(dayStart++)

					}
				}
			} else {
				for (var i = 0; i < 3; i++) {
					this.trs[i] = []
					for (var j = 0; j < 7; j++) {
						this.trs[i].push(dayStart++)

					}
				}
			}



			for (var i = 0; i < next_dateNum; i++) {
				this.lastTr.push(dayStart++)
			}

			for (var i = 0; i < 7 - next_dateNum; i++) {
				this.lastTr.push('')
			}



		},
		choose_day: function(event, td) {
			//alert("1");



			if (td != '') {
				this.selected = td

				var weekday = new Date(this.right_year, this.right_month - 1, event.target.innerText).getDay()
					//alert(weekday)
				if (weekday == 0) {
					this.left_week = this.arr_weekday[6]
				} else {
					this.left_week = this.arr_weekday[weekday - 1]
				}
				this.left_month = this.right_month
				this.left_day = parseInt(event.target.innerText)
				this.main_date = this.right_year + '-' + this.left_month + '-' + this.left_day
			}


		},
		now: function() {
			this.left_year = this.mydate.getFullYear()
			this.left_month = this.mydate.getMonth() + 1
			this.left_week = this.arr_weekday[this.mydate.getDay() - 1]
			this.left_day = this.mydate.getDate()
			this.right_year = this.mydate.getFullYear()
			this.right_month = this.mydate.getMonth() + 1

			this.selected = this.startDay
		},
		sure: function() {
			this.main_date = this.right_year + '-' + this.left_month + '-' + this.left_day
		}
	}
})