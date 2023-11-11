import type { Meta, StoryObj } from '@storybook/react'
import { IconPicker } from '../../lib/react-fa-icon-picker-mui'

const meta: Meta<typeof IconPicker> = {
  component: IconPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
} satisfies Meta<typeof IconPicker>

export const PinkButton: Story = {
  args: {
    formControlProps: { sx: {background: 'pink'} },
  },
} satisfies Meta<typeof IconPicker>

export const BlueButtonPurpleDialog: Story = {
  args: {
    formControlProps: { sx: { background: 'lightblue' } },
    dialogProps: { PaperProps: { style: { backgroundColor: '#c2b0e2' } } },
  },
} satisfies Meta<typeof IconPicker>

export const GreenButtonSize2Icons: Story = {
  args: {
    formControlProps: { sx: { background: 'lightgreen' } },
    iconListIconSize: 2,
  },
} satisfies Meta<typeof IconPicker>

export const GreenButtonSize5Icons: Story = {
  args: {
    formControlProps: { sx: { background: 'lightgreen' } },
    iconListIconSize: 5,
  },
} satisfies Meta<typeof IconPicker>

export const WithSearch: Story = {
  args: { showSearch: true },
} satisfies Meta<typeof IconPicker>

export const PurpleDialogWithSearch: Story = {
  args: {
    dialogProps: { PaperProps: { style: { backgroundColor: '#c2b0e2' } } },
    showSearch: true,
  },
} satisfies Meta<typeof IconPicker>

export const EightIconsPerPage: Story = {
  args: { iconPerPage: 8 },
} satisfies Meta<typeof IconPicker>

