import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import { spacePlans, spacesMeta } from '../../data';

export default {
  title: 'Template/Spaces Cards',
  parameters: {
    layout: 'padded',
  },
};

/** 단일 카드 */
export const SingleCard = {
  render: () => {
    const plan = spacePlans[0];
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="220"
          image={plan.image}
          alt={plan.name}
        />
        <CardContent>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
            {plan.capacity}{plan.contract ? ` · ${plan.contract}` : ''}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
            {plan.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 700 }}>
            {plan.priceLabel}
          </Typography>
          {plan.priceNote && (
            <Typography variant="caption" color="text.secondary" display="block">
              {plan.priceNote}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            자세히 보기
          </Button>
        </CardActions>
      </Card>
    );
  },
};

/** 특징 포함 카드 */
export const WithFeatures = {
  render: () => {
    const plan = spacePlans[0];
    return (
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={plan.image}
            alt={plan.name}
          />
          {plan.isPopular && (
            <Chip
              icon={<StarIcon sx={{ fontSize: '0.75rem !important' }} />}
              label="인기"
              size="small"
              color="primary"
              sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700 }}
            />
          )}
        </Box>
        <CardContent>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
            {plan.capacity}{plan.contract ? ` · ${plan.contract}` : ''}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
            {plan.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 700 }}>
            {plan.priceLabel}
          </Typography>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={0.75}>
            {plan.features.slice(0, 3).map((feat) => (
              <Box key={feat} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon sx={{ fontSize: 14, color: 'primary.main', flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">{feat}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="contained" fullWidth size="small" href="/contact">
            {spacesMeta.inquiryLabel}
          </Button>
        </CardActions>
      </Card>
    );
  },
};

/** 전체 플랜 그리드 */
export const AllPlans = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {spacePlans.map((plan) => (
          <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderColor: plan.isPopular ? 'primary.main' : 'divider',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={plan.image}
                  alt={plan.name}
                />
                {plan.isPopular && (
                  <Chip
                    icon={<StarIcon sx={{ fontSize: '0.75rem !important' }} />}
                    label="인기"
                    size="small"
                    color="primary"
                    sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700, fontSize: '0.6875rem' }}
                  />
                )}
              </Box>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>
                  {plan.capacity}{plan.contract ? ` · ${plan.contract}` : ''}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
                  {plan.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  {plan.priceLabel}
                </Typography>
                {plan.priceNote && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    {plan.priceNote}
                  </Typography>
                )}
                <Divider sx={{ my: 1.5 }} />
                <Stack spacing={0.75}>
                  {plan.features.slice(0, 3).map((feat) => (
                    <Box key={feat} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon sx={{ fontSize: 14, color: 'primary.main', flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">{feat}</Typography>
                    </Box>
                  ))}
                  {plan.features.length > 3 && (
                    <Typography variant="caption" color="text.disabled">
                      +{plan.features.length - 3}개 포함
                    </Typography>
                  )}
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                  variant={plan.isPopular ? 'contained' : 'outlined'}
                  fullWidth
                  href="/contact"
                  sx={{ py: 1 }}
                >
                  {spacesMeta.inquiryLabel}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
};
