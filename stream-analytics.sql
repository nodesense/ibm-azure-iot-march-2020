SELECT
    System.Timestamp() AS OutTime,
    type,
    AVG ([current]) as "AvgCurrent",
    AVG (voltage) as "AvgVoltage",
    AVG (energy) as "AvgEnergy",
    SUM(totalEnergy) as "TotalEnergy"
INTO
    [energyanalytics]
FROM
    [krishiothubinput]
WHERE 
    type = 'energy'
GROUP BY 
        type,
        TumblingWindow(second, 60)
        