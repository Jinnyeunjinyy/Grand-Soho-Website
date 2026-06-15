import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { inquiryTypes, contactInfo } from '../../../data/contact';

const INITIAL_FORM = {
  name: '',
  phone: '',
  inquiryType: '',
  message: '',
};

/**
 * ContactPage 컴포넌트
 *
 * /contact 페이지. 입주 상담 / 회의실 / 기타 문의 폼.
 * 제출 시 onSubmit 핸들러 호출 (EmailJS 연동은 상위에서 처리).
 *
 * Props:
 * @param {function} onSubmit - 폼 데이터 제출 핸들러 async (formData) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ContactPage onSubmit={async (data) => await emailjs.send(...)} />
 */
function ContactPage({ onSubmit, sx }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status) setStatus(null);
  };

  const isValid = form.name.trim() && form.phone.trim() && form.inquiryType && form.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(form);
      }
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ ...sx }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 5, md: 10, lg: 14 },
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.light', letterSpacing: '0.12em', display: 'block', mb: 1 }}
        >
          Contact
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
          문의하기
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: 480 }}>
          입주 상담부터 회의실 예약까지. 편하게 남겨 주시면 빠르게 답변드립니다.
        </Typography>
      </Box>

      {/* 본문 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, sm: 5, md: 10, lg: 14 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          {/* 폼 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  label="이름"
                  value={form.name}
                  onChange={handleChange('name')}
                  required
                  fullWidth
                  variant="outlined"
                  autoComplete="name"
                />
                <TextField
                  label="연락처"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                />
                <FormControl fullWidth required>
                  <InputLabel>문의 유형</InputLabel>
                  <Select
                    value={form.inquiryType}
                    label="문의 유형"
                    onChange={handleChange('inquiryType')}
                  >
                    {inquiryTypes.map((t) => (
                      <MenuItem key={t.value} value={t.value}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="문의 내용"
                  value={form.message}
                  onChange={handleChange('message')}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="궁금하신 내용을 자유롭게 적어 주세요."
                />

                {status === 'success' && (
                  <Alert severity="success">
                    문의가 접수되었습니다. 영업일 기준 1~2일 내로 답변드립니다.
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert severity="error">
                    전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!isValid || isLoading}
                  sx={{ py: 1.75, mt: 1 }}
                >
                  {isLoading ? '전송 중...' : '문의 보내기'}
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* 연락처 정보 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4} divider={<Divider />}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  연락처
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EmailIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="body2">{contactInfo.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main', mt: '2px' }} />
                    <Box>
                      <Typography variant="body2">{contactInfo.hours.weekday}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contactInfo.hours.weekend}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                  파트너 프로그램 문의
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  투자 상담 및 파트너 프로그램 관련 문의는 문의 유형에서
                  &apos;입주 상담&apos;을 선택해 주세요. 그랜드벤처스 담당자가 직접 답변드립니다.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ContactPage;
