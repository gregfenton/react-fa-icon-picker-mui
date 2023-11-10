import type { Meta, StoryObj } from '@storybook/react'
import { IconPicker } from '../../lib/react-fa-icon-picker-mui'

const meta: Meta<typeof IconPicker> = {
  component: IconPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
  },
} satisfies Meta<typeof IconPicker>
