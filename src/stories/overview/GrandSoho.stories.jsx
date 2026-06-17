import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';

export default {
  title: 'Overview/Grand Soho',
  parameters: { layout: 'padded' },
};

export const Doc = {
  render: () => (
    <>
      <DocumentTitle
        title="Grand Soho 기획서"
        status="Available"
        note="웹사이트 MVP 기획 · 페이지 구조 · 기능 정의"
        brandName="Grand Ventures"
        systemName="Grand Soho"
        version="1.0"
      />
      <PageContainer>

        {/* 프로젝트 개요 */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>프로젝트 개요</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Grand Soho는 VC 그랜드벤처스가 직접 운영하는 강남 소재 스타트업 공유오피스입니다.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          단순 공간 임대를 넘어, 입주사에게 투자·멘토링·법률 자문·오픈이노베이션 등
          스타트업 성장 파트너 프로그램을 함께 제공하는 것이 핵심 차별점입니다.
        </Typography>

        <SectionTitle title="목표" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableBody>
              {[
                '잠재 입주 고객이 Grand Soho의 공간 및 파트너 프로그램 가치를 직관적으로 이해하도록 한다',
                '입주 상담·공간 예약으로의 전환(Conversion)을 유도한다',
                '기존 입주 고객이 공지사항·예약 정보를 편리하게 확인할 수 있도록 한다',
              ].map((goal, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ width: 32, color: 'text.disabled', fontWeight: 700 }}>{i + 1}</TableCell>
                  <TableCell>{goal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 사용자 정의 */}
        <SectionTitle title="사용자 정의 (User Personas)" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>유형</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['잠재 입주 고객', '시드~Series A 직전·직후 스타트업 창업자·공동창업자. 투자 유치 전후 사무공간과 성장 지원을 함께 찾는 5~10인 팀'],
                ['기존 입주 고객', '공간 예약 및 파트너 프로그램을 이용하는 현재 입주사 멤버'],
                ['운영자', '공간 관리, 입주 문의 처리, 공지사항 관리를 담당하는 관리자'],
              ].map(([type, desc]) => (
                <TableRow key={type}>
                  <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{type}</TableCell>
                  <TableCell>{desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 핵심 셀링 포인트 */}
        <SectionTitle title="핵심 셀링 포인트 — 파트너 프로그램 4대 혜택" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>혜택</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>내용</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['오픈이노베이션 · PoC', '(주)오메가포인트와의 에듀테크·콘텐츠 분야 사업성 검증 기회 (25년 브랜드 시매쓰 운영사)'],
                ['투자·성장 멘토링', '그랜드벤처스 파트너 직접 참여, 벤처투자·성장 전략 컨설팅 월 1시간'],
                ['법률·컴플라이언스 자문', '변호사 자격 보유 이하연 파트너, 스타트업 리스크·법률 자문 월 30분'],
                ['포트폴리오 네트워킹', '그랜드벤처스 포트폴리오사·파트너사와의 네트워킹 기회'],
              ].map(([benefit, desc]) => (
                <TableRow key={benefit}>
                  <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{benefit}</TableCell>
                  <TableCell>{desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지 구조 */}
        <SectionTitle title="페이지 구조 (IA)" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>경로</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>페이지</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['/', '홈', 'Hero → Features → Partner Program → Gallery → Location'],
                ['/spaces', '공간 안내', '공간 유형별 탭 · 요금 카드'],
                ['/contact', '문의', '입주 상담 폼 · EmailJS 전송'],
                ['/notice', '공지사항 목록', '카테고리 필터 · 고정 공지'],
                ['/notice/:id', '공지사항 상세', '본문 · 이전/다음 이동'],
                ['외부 ↗', '네이버 예약', '새 탭으로 이동'],
              ].map(([path, page, desc]) => (
                <TableRow key={path}>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>{path}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{page}</TableCell>
                  <TableCell color="text.secondary">{desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 홈 섹션 구조 */}
        <SectionTitle title="홈 섹션 구조" />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          헤드라인: <strong>"공간도 전략입니다."</strong>
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>섹션</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>목적</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['1', 'Hero', '헤드라인 + 서브카피 + CTA 2종 (입주 문의, 예약하기)'],
                ['2', 'Feature', '공간 편의 4대 특징 카드'],
                ['3', 'Partner Program ★', 'VC 운영 파트너 프로그램 4대 혜택 카드'],
                ['4', 'Gallery', '공간 사진 벤토 그리드 + Lightbox'],
                ['5', 'Location', '카카오맵 + 주소·교통·연락처'],
              ].map(([num, section, purpose]) => (
                <TableRow key={num}>
                  <TableCell sx={{ color: 'text.disabled', fontWeight: 700 }}>{num}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{section}</TableCell>
                  <TableCell>{purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 문의 폼 */}
        <SectionTitle title="문의 폼 필드 (/contact)" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>필드</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>타입</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>필수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['이름', 'Text Input', true],
                ['연락처', 'Text Input', true],
                ['문의 유형', 'Select (입주 상담 / 회의실 / 기타)', true],
                ['문의 내용', 'Textarea', true],
              ].map(([field, type, required]) => (
                <TableRow key={field}>
                  <TableCell sx={{ fontWeight: 600 }}>{field}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>
                    <Chip
                      label={required ? 'Required' : 'Optional'}
                      size="small"
                      color={required ? 'primary' : 'default'}
                      sx={{ fontSize: 11 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* GNB */}
        <SectionTitle title="GNB (Global Navigation Bar)" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>메뉴</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>링크</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['Grand Soho (로고)', '/'],
                ['공간 안내', '/spaces'],
                ['공지사항', '/notice'],
                ['문의', '/contact'],
                ['예약하기 ↗', '네이버 예약 (외부, 새 탭)'],
              ].map(([menu, link]) => (
                <TableRow key={menu}>
                  <TableCell sx={{ fontWeight: 600 }}>{menu}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{link}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 기술 스택 */}
        <SectionTitle title="기술 스택" />
        <TableContainer sx={{ mb: 5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>구분</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>기술</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['프레임워크', 'React.js (Vite)'],
                ['UI 라이브러리', 'MUI v7'],
                ['스타일링', 'MUI sx prop, 디자인 토큰'],
                ['이메일 전송', 'EmailJS'],
                ['지도', '카카오맵 API'],
                ['패키지 매니저', 'pnpm'],
              ].map(([category, tech]) => (
                <TableRow key={category}>
                  <TableCell sx={{ fontWeight: 600 }}>{category}</TableCell>
                  <TableCell>{tech}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Out of Scope */}
        <SectionTitle title="MVP 범위 외 (Out of Scope)" />
        <TableContainer>
          <Table size="small">
            <TableBody>
              {[
                '관리자 CMS 페이지 (공지사항은 정적 데이터 또는 별도 협의)',
                '회원 가입 / 로그인',
                '온라인 결제',
                '다국어(영어) 지원',
              ].map((item) => (
                <TableRow key={item}>
                  <TableCell sx={{ color: 'text.disabled', width: 24 }}>—</TableCell>
                  <TableCell color="text.secondary">{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </PageContainer>
    </>
  ),
};
