import React from 'react';
import { Button, Card, DatePicker, Divider, Typography } from 'antd';
import { displayErrorMessage, formatListingPrice } from '../../../../lib/utils';
import { Moment } from 'moment';
import moment from 'moment';

const { Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const disabledDate = (currentDate?: Moment) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'));
      return dateIsBeforeEndOfDay;
    } else {
      return false;
    }
  };

  const setCheckInDateAndClearCheckoutDate = (
    selectedCheckInDate: Moment | null
  ) => {
    if (!moment(checkInDate).isSame(selectedCheckInDate)) {
      setCheckInDate(selectedCheckInDate);
      setCheckOutDate(null);
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
        return displayErrorMessage(
          'Invalid date range. Check out date must be after check in date.'
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate}
              format={'YYYY/MM/DD'}
              disabledDate={disabledDate}
              showToday={false}
              onChange={(dateValue) =>
                setCheckInDateAndClearCheckoutDate(dateValue)
              }
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate}
              format={'YYYY/MM/DD'}
              disabled={checkOutInputDisabled}
              disabledDate={disabledDate}
              showToday={false}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button
          disabled={buttonDisabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
