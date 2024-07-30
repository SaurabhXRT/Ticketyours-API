function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import Booking from "../models/Booking.js";
import ShowtimeSlot from "../models/Showtime_slot.js";
import { UserService } from "./UserService.js";
import { ShowtimeSlotService } from "./ShowtimeService.js";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import UserBooking from "../models/Booking.user.js";
var showtimeService = new ShowtimeSlotService();
var BookingService = /*#__PURE__*/ function() {
    "use strict";
    function BookingService() {
        _class_call_check(this, BookingService);
        _define_property(this, "userService", void 0);
        this.userService = new UserService();
    }
    _create_class(BookingService, [
        {
            key: "updateSeatStatus",
            value: function updateSeatStatus(showtime, seatNumbers) {
                seatNumbers.forEach(function(seatNumber) {
                    var seat = showtime.seats.find(function(seat) {
                        return seat.seat_number === seatNumber;
                    });
                    if (seat && seat.status === "available") {
                        seat.status = "booked";
                        seat.locked_until = undefined;
                    } else {
                        throw new Error("Seat ".concat(seatNumber, " is not available"));
                    }
                });
            }
        },
        {
            key: "saveUserBooking",
            value: function saveUserBooking(booking, showtime, userId) {
                return _async_to_generator(function() {
                    var movieDetails, cinemaHallDetails, userBooking;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    showtimeService.getMovieDetailsByShowtimeId(showtime._id)
                                ];
                            case 1:
                                movieDetails = _state.sent();
                                return [
                                    4,
                                    showtimeService.getCinemaDetailsByShowtimeId(showtime._id)
                                ];
                            case 2:
                                cinemaHallDetails = _state.sent();
                                // Create user booking
                                userBooking = new UserBooking({
                                    user_id: userId,
                                    cinema_hall_name: cinemaHallDetails.name,
                                    movie_title: movieDetails.title,
                                    seat_numbers: booking.seats,
                                    showtime: showtime.start_time,
                                    booking_date: booking.booking_date,
                                    total_price: booking.amount_paid
                                });
                                return [
                                    4,
                                    userBooking.save()
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "bookSeats",
            value: function bookSeats(showtimeId, seatNumbers, userId, paymentId) {
                var _this = this;
                return _async_to_generator(function() {
                    var session, showtime, movieId, payment, amountPaid, booking, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    mongoose.startSession()
                                ];
                            case 1:
                                session = _state.sent();
                                session.startTransaction();
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    9,
                                    11,
                                    12
                                ]);
                                return [
                                    4,
                                    ShowtimeSlot.findById(showtimeId).session(session)
                                ];
                            case 3:
                                showtime = _state.sent();
                                if (!showtime) {
                                    throw new Error("Showtime not found");
                                }
                                // Update seat status
                                _this.updateSeatStatus(showtime, seatNumbers);
                                // Fetch or create user
                                // let userData = await this.userService.get(user.phone);
                                // if (!userData) {
                                //   userData = await this.userService.create({
                                //     phone: user.phone,
                                //     email: user.email
                                //   });
                                // }
                                // Fetch movie ID from showtime
                                movieId = showtime.movie_id;
                                return [
                                    4,
                                    Payment.findById(paymentId).session(session)
                                ];
                            case 4:
                                payment = _state.sent();
                                if (!payment) {
                                    throw new Error("Payment not found");
                                }
                                // Calculate total amount paid
                                amountPaid = seatNumbers.length * showtime.seats.find(function(seat) {
                                    return seat.seat_number === seatNumbers[0];
                                }).price;
                                // Create booking
                                booking = new Booking({
                                    user_id: userId,
                                    movie_id: movieId,
                                    showtime_id: showtimeId,
                                    booking_date: new Date(),
                                    seats: seatNumbers,
                                    amount_paid: amountPaid,
                                    payment_id: payment._id,
                                    ticket_id: new mongoose.Types.ObjectId().toString()
                                });
                                return [
                                    4,
                                    booking.save({
                                        session: session
                                    })
                                ];
                            case 5:
                                _state.sent();
                                return [
                                    4,
                                    showtime.save({
                                        session: session
                                    })
                                ];
                            case 6:
                                _state.sent();
                                // Save user booking details
                                return [
                                    4,
                                    _this.saveUserBooking(booking, showtime, userId)
                                ];
                            case 7:
                                _state.sent();
                                return [
                                    4,
                                    session.commitTransaction()
                                ];
                            case 8:
                                _state.sent();
                                return [
                                    2,
                                    booking
                                ];
                            case 9:
                                error = _state.sent();
                                return [
                                    4,
                                    session.abortTransaction()
                                ];
                            case 10:
                                _state.sent();
                                throw error;
                            case 11:
                                session.endSession();
                                return [
                                    7
                                ];
                            case 12:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return BookingService;
}();
export default BookingService;
