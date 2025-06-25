# Registration Module Documentation

## Overview

The registration module provides a comprehensive multi-step user registration flow for the Knozify application. It includes form validation, state management, progress tracking, and a responsive UI that works seamlessly across different screen sizes and themes.

## 📖 Documentation

This README provides a quick overview of the registration module. For comprehensive documentation, please refer to:

- **[Component Documentation](./COMPONENT_DOCUMENTATION.md)** - Detailed component API, props, usage examples, and architecture
- **[API Reference](#api-reference)** - Quick reference for developers
- **[Examples](#examples)** - Code examples and implementation patterns

## Architecture

```
src/modules/auth/registeration/
├── components/
│   ├── steps/           # Individual form step components
│   ├── register-steps.tsx   # Progress indicator component
│   └── index.ts         # Component exports
├── hooks/
│   └── useMultiStepForm.tsx # Multi-step form logic
├── schema/
│   └── index.ts         # Zod validation schemas
├── store/
│   └── index.ts         # Zustand state management
├── README.md           # This overview documentation
└── COMPONENT_DOCUMENTATION.md # Comprehensive component docs
```

## Features

- ✅ **Multi-step Form Flow**: 5-step registration process with seamless navigation
- ✅ **Form Validation**: Real-time validation with comprehensive Zod schemas
- ✅ **State Persistence**: Form data persists across page refreshes using sessionStorage
- ✅ **Progress Tracking**: Visual progress indicator with step status and completion
- ✅ **Responsive Design**: Mobile-first design with desktop enhancements
- ✅ **Dark Mode Support**: Full theme integration with dynamic styling
- ✅ **Enter Key Support**: Submit forms using Enter key for better UX
- ✅ **Error Handling**: Comprehensive error display and user-friendly validation
- ✅ **Type Safety**: Full TypeScript support with proper type inference
- ✅ **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- ✅ **Performance**: Optimized rendering with memoization and efficient state updates

## Registration Flow

### Step 1: Phone Number (UserCredentialsForm)
**Purpose**: Collect user's phone number for account creation and verification

**Fields**:
- `contact` (string, required): International phone number with country code

**Validation**:
- Non-empty phone number
- Valid international format

**Features**:
- International phone input with country selection
- Real-time formatting and validation
- Dark mode support for phone input component

### Step 2: OTP Verification (OtpValidationForm)
**Purpose**: Verify phone number ownership through SMS verification

**Fields**:
- `otp` (string, required): 6-digit verification code

**Validation**:
- Non-empty OTP code
- Exact length validation

**Features**:
- Segmented OTP input (6 individual digit fields)
- Auto-focus progression between fields
- Paste support for copying OTP codes

### Step 3: Personal Details (UserDetailsForm)
**Purpose**: Collect user's personal information

**Fields**:
- `first_name` (string, required): User's first name
- `last_name` (string, required): User's last name  
- `birth_date` (Date, required): User's date of birth

**Validation**:
- Names must start with capital letter and contain only letters
- Valid date of birth
- All fields required

**Features**:
- Text inputs with real-time validation
- Date picker with calendar interface
- Proper date serialization for storage

### Step 4: Username (UserNameForm)
**Purpose**: Let user choose a unique username for their account

**Fields**:
- `username` (string, required): Unique username

**Validation**:
- No spaces or commas allowed
- Must not be blank
- Unique username validation (ready for backend integration)

**Features**:
- Real-time availability checking (placeholder for API integration)
- Username format validation

### Step 5: Password (PasswordForm)
**Purpose**: Set secure password with confirmation

**Fields**:
- `password` (string, required): User's password
- `confirmPassword` (string, required): Password confirmation

**Validation**:
- Minimum 8 characters
- Must include uppercase letter
- Must include lowercase letter
- Must include number
- Must include special character
- Password confirmation must match

**Features**:
- Password strength indicator (visual feedback)
- Real-time password matching validation
- Secure password input fields

## Components Documentation

### Core Components

#### `RegisterStepsBanner`
**Location**: `components/register-steps.tsx`

Visual progress indicator showing current step and overall progress.

**Props**:
```typescript
interface RegisterStepsBannerProps {
  currentStep: number;        // Current step (1-based)
  totalSteps: number;         // Total number of steps
  stepLabels: string[];       // Array of step labels
  stepIcons: LucideIcon[];    // Array of step icons
  className?: string;         // Additional CSS classes
}
```

**Features**:
- Visual step progression with icons
- Color-coded step status (current, completed, upcoming)
- Progress bar with percentage
- Responsive design (hidden on mobile)

#### `useMultiStepForm` Hook
**Location**: `hooks/useMultiStepForm.tsx`

Custom hook for managing multi-step form navigation and state.

**Usage**:
```typescript
const { step, steps, currentStepIndex, isFirstStep, isLastStep, next, back, goto } = 
  useMultiStepForm(({ next, back }) => [
    <Step1 onNext={next} onBack={back} />,
    <Step2 onNext={next} onBack={back} />,
    // ... more steps
  ]);
```

**Returns**:
- `step`: Current step component
- `steps`: Array of all step components  
- `currentStepIndex`: Current step index (0-based)
- `isFirstStep`: Boolean indicating if on first step
- `isLastStep`: Boolean indicating if on last step
- `next()`: Function to advance to next step
- `back()`: Function to go to previous step
- `goto(index)`: Function to jump to specific step

### Step Components

Each step component follows a consistent pattern:

**Common Props**:
```typescript
interface StepProps {
  onNext?: () => void;        // Callback for advancing to next step
  onBack?: () => void;        // Callback for going to previous step
  showBackButton?: boolean;   // Whether to show back button
}
```

**Common Features**:
- Form validation before progression
- Data persistence to Zustand store
- Error handling and display
- Enter key support for form submission
- Consistent styling and layout

#### Step 1: `UserCredentialsForm`
- Collects phone number
- International phone input with country selection
- No back button (first step)

#### Step 2: `OtpValidationForm`  
- OTP verification interface
- 6-digit segmented input
- Back button available

#### Step 3: `UserDetailsForm`
- Personal information collection
- Date picker for birth date
- Text inputs for names

#### Step 4: `UserNameForm`
- Username selection
- Real-time validation
- Availability checking (ready for API)

#### Step 5: `PasswordForm`
- Password creation with confirmation
- Strength validation
- Final form submission

## State Management

### Zustand Store (`useRegisterFormStore`)
**Location**: `store/index.ts`

Centralized state management for registration form data.

**State Shape**:
```typescript
type RegisterFormData = Partial<{
  contact: string;
  otp: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  username: string;
  password: string;
  confirmPassword: string;
}>;
```

**Store Methods**:
- `setFormData(data)`: Update multiple fields
- `updateField(field, value)`: Update single field
- `clearFormData()`: Reset all form data
- `getFormData()`: Retrieve current form data

**Persistence**:
- Data persists in `sessionStorage`
- Custom serialization for Date objects
- Automatic cleanup on browser session end

## Validation Schema

### Zod Schema (`registerSchema`)
**Location**: `schema/index.ts`

Comprehensive validation rules for all form fields.

**Schema Definition**:
```typescript
export const registerSchema = z.object({
  username: z.string().regex(/^[^ ,]+$/, "No spaces or commas allowed"),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Strong password required"
  ),
  first_name: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Proper name format"),
  last_name: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Proper name format"),
  contact: z.string().nonempty(),
  birth_date: z.date(),
  otp: z.string(),
});
```

## Main Registration Screen

### Route Component
**Location**: `src/app/(auth)/register/index.tsx`

Main registration page that orchestrates the entire flow.

**Key Features**:
- Multi-step form management
- Progress indicator integration
- Responsive layout with sidebar
- Final form submission handling

**Layout Structure**:
```
┌─────────────────────────────────┐
│  ┌─────────────┐ ┌─────────────┐ │
│  │             │ │             │ │
│  │  Progress   │ │   Current   │ │
│  │  Sidebar    │ │    Step     │ │
│  │             │ │   Content   │ │
│  │             │ │             │ │
│  └─────────────┘ └─────────────┘ │
└─────────────────────────────────┘
```

## Styling and Theming

### CSS Classes
- Uses Tailwind CSS with design system tokens
- Consistent spacing and typography
- Dark mode support throughout
- Responsive breakpoints

### Design Tokens
- `--background`: Background colors
- `--foreground`: Text colors  
- `--primary`: Primary brand color
- `--border`: Border colors
- `--ring`: Focus ring colors

## Accessibility

### Features
- Proper semantic HTML structure
- Keyboard navigation support
- Focus management between steps
- Screen reader friendly labels
- ARIA attributes where needed

### Keyboard Support
- Tab navigation through form fields
- Enter key to submit forms
- Arrow keys in date picker
- Escape to close dropdowns

## Error Handling

### Validation Errors
- Real-time field validation
- Clear error messages
- Visual error indicators
- Prevents progression with errors

### Network Errors (Ready for API Integration)
- Error boundaries for component failures
- Retry mechanisms for failed requests
- User-friendly error messages
- Graceful degradation

## Performance Optimizations

### Code Splitting
- Lazy loading of registration components
- Dynamic imports for heavy dependencies

### State Management
- Memoized form validation
- Efficient re-renders with proper dependencies
- Persistence layer optimizations

### Bundle Size
- Tree-shaking for unused code
- Optimized icon imports
- Minimal dependency footprint

## Future Enhancements

### API Integration Points
- Phone number verification service
- Username availability checking
- Account creation endpoint
- Email verification (optional)

### Additional Features
- Social media registration
- Profile picture upload
- Terms and conditions acceptance
- Email verification option
- Password strength meter

### UX Improvements
- Form auto-save drafts
- Step-by-step animations
- Voice-over guidance
- Multi-language support

## Testing Strategy

### Unit Tests (Recommended)
- Individual component testing
- Form validation testing
- State management testing
- Hook functionality testing

### Integration Tests (Recommended)
- Complete registration flow
- Cross-step data persistence
- Error handling scenarios
- Accessibility compliance

### E2E Tests (Recommended)
- Full user journey testing
- Mobile responsiveness
- Theme switching behavior
- Performance benchmarks

## Deployment Considerations

### Environment Variables
- API endpoints for different environments
- Feature flags for experimental features
- Analytics tracking configuration

### Performance Monitoring
- Form completion rates
- Step abandonment tracking
- Error frequency monitoring
- User experience metrics

---

This documentation provides a comprehensive overview of the registration module. For specific implementation details, refer to the individual component files and their inline documentation.
