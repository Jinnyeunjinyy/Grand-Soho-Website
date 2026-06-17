import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GavelIcon from "@mui/icons-material/Gavel";
import HubIcon from "@mui/icons-material/Hub";
import {
	DocumentTitle,
	PageContainer,
	SectionTitle,
} from "../../components/storybookDocumentation";

/** Style class name mapping */
const STYLE_CLASS_MAP = {
	outlined: "material-symbols-outlined",
	rounded: "material-symbols-rounded",
	sharp: "material-symbols-sharp",
};

/**
 * MaterialSymbol Component
 *
 * Props:
 * @param {string} name - Icon name from Material Symbols [Required]
 * @param {string} variant - Icon style ('outlined' | 'rounded' | 'sharp') [Optional, default: 'outlined']
 * @param {number} size - Icon size in px [Optional, default: 24]
 * @param {boolean} fill - Fill state (Fill axis) [Optional, default: false]
 * @param {number} weight - Stroke weight (Weight axis) [Optional, default: 400]
 * @param {string} color - Icon color [Optional, default: 'inherit']
 *
 * Example usage:
 * <MaterialSymbol name="favorite" variant="rounded" size={ 32 } fill />
 */
const MaterialSymbol = ({
	name,
	variant = "outlined",
	size = 24,
	fill = false,
	weight = 400,
	color = "inherit",
}) => (
	<span
		className={STYLE_CLASS_MAP[variant] || STYLE_CLASS_MAP.outlined}
		style={{
			fontSize: size,
			color,
			fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}`,
			lineHeight: 1,
			display: "inline-block",
			verticalAlign: "middle",
		}}
	>
		{name}
	</span>
);

export default {
	title: "Style/Icons",
	component: MaterialSymbol,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
## Material Symbols

Google Material Symbols is a Variable Font based icon system with 2,500+ icons.

### Structure
- Style: Outlined, Rounded, Sharp
- Variable Font Axes: Fill, Weight, Grade, Optical Size

### Usage
Use the Controls panel to change icon properties in real-time.
        `,
			},
		},
	},
	argTypes: {
		name: {
			control: "text",
			description: "Icon name (Material Symbols name)",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "favorite" },
			},
		},
		variant: {
			control: "select",
			options: ["outlined", "rounded", "sharp"],
			description: "Icon style",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "outlined" },
			},
		},
		size: {
			control: { type: "range", min: 16, max: 96, step: 4 },
			description: "Icon size (px)",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: 24 },
			},
		},
		fill: {
			control: "boolean",
			description: "Fill state (Fill axis)",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: false },
			},
		},
		weight: {
			control: { type: "range", min: 100, max: 700, step: 100 },
			description: "Stroke weight (Weight axis)",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: 400 },
			},
		},
		color: {
			control: "color",
			description: "Icon color",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "inherit" },
			},
		},
	},
};

/** Default - Interactive Controls */
export const Default = {
	args: {
		name: "favorite",
		variant: "outlined",
		size: 48,
		fill: false,
		weight: 400,
		color: "#0000FF",
	},
};

/**
 * FeaturedIcon — MUI 포팅 버전 (Untitled UI 원본은 TypeScript + Tailwind)
 *
 * 아이콘을 단독이 아닌 스타일화된 컨테이너(배경 + 형태)에 담는 컴포넌트.
 *
 * 5가지 테마:
 *   light        — 원형, 연한 배경
 *   dark         — 둥근 사각형, 진한 배경 + 스큐어모픽 그림자
 *   outline      — 아이콘 주변 동심원 2개 (물결 효과)
 *   modern       — 둥근 사각형, 경계선 + 입체 그림자
 *   modern-neue  — 둥근 사각형, 외부 컨테이너 안에 내부 사각형이 떠있는 3D 레이어드 효과
 */
const SIZES = { sm: 32, md: 40, lg: 48, xl: 56 };
const ICON_SIZES = { sm: 16, md: 20, lg: 24, xl: 28 };
const RADII = { sm: '8px', md: '10px', lg: '12px', xl: '14px' };
const INNER_RADII = { sm: '4px', md: '6px', lg: '8px', xl: '10px' };

function FeaturedIcon({ icon: Icon, theme = 'dark', size = 'md', sx }) {
  const px = SIZES[size];
  const iconPx = ICON_SIZES[size];
  const radius = RADII[size];

  if (theme === 'light') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: '50%', backgroundColor: 'rgba(70,51,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0, ...sx }}>
        <Icon sx={{ fontSize: iconPx }} />
      </Box>
    );
  }
  if (theme === 'dark') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(44,31,32,0.4), inset 0 1px 0 rgba(255,255,255,0.12)', flexShrink: 0, ...sx }}>
        <Icon sx={{ fontSize: iconPx }} />
      </Box>
    );
  }
  if (theme === 'outline') {
    const outer = px + 20;
    return (
      <Box sx={{ position: 'relative', width: outer, height: outer, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...sx }}>
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', opacity: 0.1 }} />
        <Box sx={{ position: 'absolute', width: px + 6, height: px + 6, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', opacity: 0.25 }} />
        <Icon sx={{ fontSize: iconPx, color: 'primary.main', position: 'relative', zIndex: 1 }} />
      </Box>
    );
  }
  if (theme === 'modern') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(44,31,32,0.08), 0 1px 2px rgba(44,31,32,0.06)', color: 'primary.main', flexShrink: 0, ...sx }}>
        <Icon sx={{ fontSize: iconPx }} />
      </Box>
    );
  }
  if (theme === 'modern-neue') {
    return (
      <Box sx={{ width: px, height: px, borderRadius: radius, backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px rgba(44,31,32,0.15)', position: 'relative', flexShrink: 0, ...sx }}>
        {/* 내부 floating 사각형 — 복잡한 그림자로 3D 레이어드 효과 */}
        <Box sx={{
          position: 'absolute',
          inset: '4px',
          borderRadius: INNER_RADII[size],
          backgroundColor: 'background.paper',
          boxShadow: [
            '0px 1px 2px rgba(44,31,32,0.18)',
            '0px 3px 3px rgba(44,31,32,0.15)',
            '1px 8px 5px rgba(44,31,32,0.08)',
            '0px 0px 0px 1px rgba(44,31,32,0.14)',
            'inset 0px -2px 2px rgba(44,31,32,0.20)',
          ].join(', '),
        }} />
        <Icon sx={{ fontSize: iconPx, color: 'text.primary', position: 'relative', zIndex: 1 }} />
      </Box>
    );
  }
  return null;
}

const THEMES = [
  { key: 'light',        label: 'light',        desc: '원형 · 연한 배경' },
  { key: 'dark',         label: 'dark',         desc: '둥근 사각형 · 진한 배경 + 그림자' },
  { key: 'outline',      label: 'outline',      desc: '아이콘 주변 동심원 (물결)' },
  { key: 'modern',       label: 'modern',       desc: '둥근 사각형 · 경계선 + 입체감' },
  { key: 'modern-neue',  label: 'modern-neue',  desc: '외부 컨테이너 안 내부 사각형 · 3D 레이어드' },
];

const DEMO_ICONS = [
  { icon: RocketLaunchIcon, label: '투자 연계' },
  { icon: TrendingUpIcon,   label: '성장 지원' },
  { icon: GavelIcon,        label: '법무 자문' },
  { icon: HubIcon,          label: '네트워크' },
];

/** Featured Icon — 테마 & 사이즈 Usage */
export const FeaturedIconUsage = {
  name: 'Featured Icon (Untitled UI 포팅)',
  parameters: { layout: 'padded' },
  render: () => (
    <>
      <DocumentTitle
        title="Featured Icon"
        status="Available"
        note="Untitled UI FeaturedIcon을 MUI sx로 포팅 — TypeScript·Tailwind 없이 동작"
        brandName="Grand Ventures"
        systemName="Grand Soho"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Featured Icon</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5, maxWidth: 560 }}>
          아이콘을 스타일화된 컨테이너에 담는 컴포넌트. 원본은 Untitled UI (TypeScript + Tailwind).
          아래는 이 프로젝트 MUI sx 버전 — BenefitCard 아이콘에 적용 가능.
        </Typography>

        {/* 테마 비교 */}
        <SectionTitle title="테마 비교 (size: md)" />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3, mb: 8 }}>
          {THEMES.map(({ key, label, desc }) => (
            <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: '16px', backgroundColor: 'background.paper' }}>
              <FeaturedIcon icon={RocketLaunchIcon} theme={key} size="md" />
              <Box>
                <Chip label={label} size="small" sx={{ fontFamily: 'monospace', fontSize: 11, mb: 0.75, borderRadius: '6px' }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 사이즈 비교 (dark 테마) */}
        <SectionTitle title="사이즈 비교 (theme: dark)" />
        <Stack direction="row" alignItems="flex-end" spacing={3} sx={{ mb: 8 }}>
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <FeaturedIcon icon={RocketLaunchIcon} theme="dark" size={size} />
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{size}</Typography>
            </Box>
          ))}
        </Stack>

        {/* BenefitCard 적용 시 미리보기 */}
        <SectionTitle title="BenefitCard 적용 시 미리보기" />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', mb: 4 }}>
          {DEMO_ICONS.map(({ icon, label }, idx) => (
            <Box key={idx} sx={{ borderRadius: '20px', backgroundColor: 'background.paper', p: 3, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid', borderColor: 'divider' }}>
              <FeaturedIcon icon={icon} theme="dark" size="md" />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>{label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>그랜드벤처스 파트너 프로그램 혜택입니다.</Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary">
          ↑ dark 테마 적용 시. 현재 BenefitCard의 border 사각형 아이콘 박스를 이 컴포넌트로 교체 가능.
        </Typography>
      </PageContainer>
    </>
  ),
};

/** Modern Neue — 3D 레이어드 아이콘 테마 상세 */
export const ModernNeueUsage = {
  name: 'Featured Icon — modern-neue',
  parameters: { layout: 'padded' },
  render: () => (
    <>
      <DocumentTitle
        title="Featured Icon — modern-neue"
        status="Available"
        note="외부 컨테이너 안에 내부 사각형이 떠있는 3D 레이어드 스타일"
        brandName="Grand Ventures"
        systemName="Grand Soho"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>modern-neue 테마</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5, maxWidth: 560 }}>
          외부 컨테이너(outer) 안에 내부 사각형(inner)이 복잡한 box-shadow로 떠있는 것처럼 보이는 3D 레이어드 효과.
          Untitled UI modern-neue 테마의 MUI 포팅.
        </Typography>

        {/* 사이즈별 */}
        <SectionTitle title="사이즈별 비교" />
        <Stack direction="row" alignItems="flex-end" spacing={4} sx={{ mb: 8, p: 4, backgroundColor: 'background.paper', borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <FeaturedIcon icon={RocketLaunchIcon} theme="modern-neue" size={size} />
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{size}</Typography>
            </Box>
          ))}
        </Stack>

        {/* 아이콘 종류별 */}
        <SectionTitle title="아이콘 종류별" />
        <Stack direction="row" spacing={3} sx={{ mb: 8, p: 4, backgroundColor: 'background.paper', borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
          {DEMO_ICONS.map(({ icon, label }) => (
            <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <FeaturedIcon icon={icon} theme="modern-neue" size="lg" />
              <Typography variant="caption" color="text.secondary">{label}</Typography>
            </Box>
          ))}
        </Stack>

        {/* BenefitCard 적용 시 미리보기 */}
        <SectionTitle title="BenefitCard 적용 시 미리보기" />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', mb: 3 }}>
          {DEMO_ICONS.map(({ icon, label }, idx) => (
            <Box key={idx} sx={{ borderRadius: '20px', backgroundColor: 'background.paper', p: 3, display: 'flex', flexDirection: 'column', gap: 2, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}>
              <FeaturedIcon icon={icon} theme="modern-neue" size="md" />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>{label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>그랜드벤처스 파트너 프로그램 혜택입니다.</Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary">
          ↑ modern-neue 적용 시. dark 테마와 비교해 더 미니멀하고 라이트한 느낌.
        </Typography>
      </PageContainer>
    </>
  ),
};

/** Fill Usage - Toggle state pattern */
export const FillUsage = {
	parameters: {
		layout: "padded",
	},
	render: () => {
		const fillExamples = [
			{ icon: "favorite", label: "Like", activeColor: "#e91e63" },
			{ icon: "bookmark", label: "Bookmark", activeColor: "#1976d2" },
			{ icon: "star", label: "Favorite", activeColor: "#ffc107" },
			{ icon: "thumb_up", label: "Recommend", activeColor: "#0000FF" },
			{ icon: "check_circle", label: "Complete", activeColor: "#2e7d32" },
			{ icon: "visibility", label: "Visible", activeColor: "#263238" },
		];

		return (
			<>
				<DocumentTitle
					title="Icon Fill Usage"
					status="Available"
					note="Fill property usage patterns"
					brandName="Design System"
					systemName="Starter Kit"
					version="1.0"
				/>
				<PageContainer>
					<Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
						Fill Usage
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						Express toggle states using the Fill property.
					</Typography>

					<SectionTitle
						title="Toggle Pattern"
						description="Selected/Unselected state expression"
					/>

					<TableContainer sx={{ mb: 4 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: 600, width: "20%" }}>
										Icon
									</TableCell>
									<TableCell sx={{ fontWeight: 600, width: "20%" }}>
										Usage
									</TableCell>
									<TableCell sx={{ fontWeight: 600, width: "30%" }}>
										Off (Fill: 0)
									</TableCell>
									<TableCell sx={{ fontWeight: 600 }}>On (Fill: 1)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{fillExamples.map((item) => (
									<TableRow key={item.icon}>
										<TableCell sx={{ fontFamily: "monospace", fontSize: 13 }}>
											{item.icon}
										</TableCell>
										<TableCell>{item.label}</TableCell>
										<TableCell>
											<Box
												sx={{ display: "flex", alignItems: "center", gap: 1 }}
											>
												<MaterialSymbol
													name={item.icon}
													size={28}
													fill={false}
												/>
												<Typography variant="caption" color="text.secondary">
													Unselected
												</Typography>
											</Box>
										</TableCell>
										<TableCell>
											<Box
												sx={{ display: "flex", alignItems: "center", gap: 1 }}
											>
												<MaterialSymbol
													name={item.icon}
													size={28}
													fill
													color={item.activeColor}
												/>
												<Typography variant="caption" color="text.secondary">
													Selected
												</Typography>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<SectionTitle title="Code Example" />

					<Box
						component="pre"
						sx={{
							backgroundColor: "grey.100",
							p: 3,
							fontSize: 12,
							fontFamily: "monospace",
							overflow: "auto",
						}}
					>
						{`// React state toggle
const [isLiked, setIsLiked] = useState(false);

<span
  className="material-symbols-outlined"
  style={{
    fontVariationSettings: \`'FILL' \${isLiked ? 1 : 0}\`,
    color: isLiked ? '#e91e63' : 'inherit',
    cursor: 'pointer'
  }}
  onClick={() => setIsLiked(!isLiked)}
>
  favorite
</span>`}
					</Box>
				</PageContainer>
			</>
		);
	},
};
