import { IReview } from '../../services/interfaces';
//#Components
import StarIcon from '@mui/icons-material/Star';
import UserAvatar from '../Avatar/UserAvatar';
//#Styles
import { Wrap, Header, StyledRating, InfoWrap, Text } from './Review.styled';

const Review = ({ review }: { review: IReview }) => {
  const { picture, name, rating, text, createdAt } = review;
  return (
    <Wrap
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Header>
        <UserAvatar picture={picture} name={name} size={50} />
        <StyledRating
          name="read-only"
          value={Number(rating)}
          readOnly
          precision={0.5}
          icon={
            <StarIcon
              fontSize="inherit"
              style={{
                width: '18px',
                height: '18px',
                stroke: '#fff',
              }}
            />
          }
          emptyIcon={
            <StarIcon
              fontSize="inherit"
              style={{
                width: '18px',
                height: '18px',
                stroke: '#fff',
              }}
            />
          }
        />
      </Header>
      <InfoWrap>
        <Text>{text}</Text>
        <div>
          <p>{name}</p>
          <p>{createdAt}</p>
        </div>
      </InfoWrap>
    </Wrap>
  );
};

export default Review;
