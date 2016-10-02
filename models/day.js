/**
 * Created by elad on 25/09/2016.
 */

module.exports = function(sequelize, DataTypes) {
    var Day = sequelize.define('Day', {
        day: {
            type:DataTypes.DATEONLY,
            field: 'day'
        },
        HourIn1: {
            type:DataTypes.TIME,
            field: 'hour_in_1'
        },
        HourOut1: {
            type:DataTypes.TIME,
            field: 'hour_out_1'
        },
        HourIn2: {
            type:DataTypes.TIME,
            field: 'hour_in_2'
        },
        HourOut2: {
            type: DataTypes.TIME,
            field: 'hour_out_2'
        },
    },
        {
            underscored: true

        });
    return Day;
};

