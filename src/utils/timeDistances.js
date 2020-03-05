import moment from 'moment'
import { trans } from '../i18n'

const timeDistances = (string) => {
  console.log(string)
  let duration = moment() - moment(string)
  console.log(moment())
  console.log(moment(string))
  duration = moment.duration(duration)
  const second = duration.asSeconds()
  console.log(second)

  const minute = duration.asMinutes()
  const hour = duration.asHours()
  const day = duration.asDays()
  const week = duration.asWeeks()
  const month = duration.asMonths()

  if (second < 60) {
    return trans('time_before.just_now')
  }

  if (minute < 60) {
    return trans('time_before.minute', { time: duration.minutes() })
  }

  if (hour < 24) {
    return trans('time_before.hour', { time: duration.hours() })
  }

  if (day < 7) {
    return trans('time_before.day', { time: duration.days() })
  }

  if (week < 5) {
    return trans('time_before.week', { time: duration.weeks() })
  }

  if (month < 12) {
    return trans('time_before.month', { time: duration.months() })
  }

  return trans('time_before.year', { time: duration.years() })
}

export default timeDistances
