import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlProps,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  TextField,
  TextFieldProps,
  TooltipProps,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import { iconList } from '../types/iconList'
import { IconSize, IconType } from '../types/iconType'
import { IconPickerItem } from './IconPickerItem'

export interface IconPickerProps {
  value: IconType
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  showSearch?: boolean
  searchPlaceholder?: string
  iconPerPage?: number
  formControlProps?: FormControlProps
  pickerInputLabel?: string
  dialogTitleText?: string
  dialogCancelText?: string
  dialogProps?: DialogProps
  dialogContentProps?: DialogContentProps
  dialogActionsProps?: DialogActionsProps
  searchFieldContainer?: BoxProps
  searchFieldProps?: TextFieldProps
  cancelButtonProps?: ButtonProps
  iconListContainerProps?: BoxProps
  iconTooltipProps?: TooltipProps
  iconButtonProps?: ButtonProps
  iconListIconSize?: IconSize
}

export function IconPicker({
  value,
  name,
  onChange,
  showSearch,
  searchPlaceholder,
  iconPerPage,
  formControlProps,
  pickerInputLabel,
  dialogTitleText,
  dialogCancelText,
  dialogProps,
  dialogContentProps,
  dialogActionsProps,
  searchFieldContainer,
  searchFieldProps,
  cancelButtonProps,
  iconListContainerProps,
  iconTooltipProps,
  iconButtonProps,
  iconListIconSize,
}: IconPickerProps) {
  const [showIconListModal, setShowIconListModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [icon, setIcon] = useState<IconType>('fa-list')
  const [page, setPage] = useState<number>(1)
  const iconListLength = iconList.length

  useEffect(() => {
    if (value && value.length > 0) {
      setIcon(value)
    }
  }, [value])

  const handleClickIconPicker = () => {
    setShowIconListModal(!showIconListModal)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    !!onChange && onChange(e as ChangeEvent<HTMLInputElement>)
    setIcon(e.target.value as IconType)
  }

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    e.preventDefault()
    setPage(page)
  }

  const paginationCount = () => {
    if (search !== '') {
      const filteredListLength = iconList.filter((icon: IconType) =>
        icon.toLowerCase().includes(search?.toLowerCase())
      ).length

      return Math.ceil(filteredListLength / (iconPerPage as number))
    }

    return Math.ceil(iconListLength / (iconPerPage as number))
  }

  return (
    <>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <FormControl variant="outlined" {...formControlProps}>
        <InputLabel>{pickerInputLabel}</InputLabel>
        <OutlinedInput
          type="text"
          value={icon}
          name={name}
          onChange={handleFieldChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickIconPicker} edge="end">
                {icon === '' ? (
                  <i className="fa fa-list" />
                ) : iconList.includes(icon) ? (
                  <i className={`fa ${icon}`} />
                ) : (
                  <CircularProgress size={20} />
                )}
              </IconButton>
            </InputAdornment>
          }
          label={pickerInputLabel}
        />
      </FormControl>

      <Dialog
        open={showIconListModal}
        onClose={handleClickIconPicker}
        fullWidth={true}
        maxWidth={'sm'}
        {...dialogProps}
      >
        <DialogTitle>
          {dialogTitleText}
          {showSearch && (
            <Box sx={{ mt: 2 }} {...searchFieldContainer}>
              <TextField
                size="small"
                variant="standard"
                placeholder={searchPlaceholder}
                fullWidth
                onChange={handleSearchChange}
                {...searchFieldProps}
              />
            </Box>
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }} {...dialogContentProps}>
          {iconList
            .filter((icon: IconType) => icon.toLowerCase().includes(search?.toLowerCase()))
            .slice((page - 1) * (iconPerPage as number), page * (iconPerPage as number))
            .map((icon: IconType, index: number) => (
              <IconPickerItem
                key={index}
                icon={icon}
                iconListContainerProps={iconListContainerProps}
                iconTooltipProps={iconTooltipProps}
                iconButtonProps={iconButtonProps}
                iconListIconSize={iconListIconSize}
                onClick={(value: IconType) => {
                  !!handleFieldChange &&
                    handleFieldChange({
                      target: { value, name },
                    } as ChangeEvent<HTMLInputElement>)
                  setShowIconListModal(false)
                  setSearch('')
                }}
              />
            ))}
        </DialogContent>
        {paginationCount() > 0 && (
          <DialogActions sx={{ display: 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination page={page} count={paginationCount()} onChange={handlePageChange} />
            </Box>
          </DialogActions>
        )}
        <DialogActions {...dialogActionsProps}>
          <Button
            onClick={() => {
              handleClickIconPicker()
              setSearch('')
            }}
            {...cancelButtonProps}
          >
            {dialogCancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const defaultIconSize: IconSize = 2

IconPicker.defaultProps = {
  showSearch: false,
  searchPlaceholder: 'Search',
  iconPerPage: 54,
  pickerInputLabel: '',
  dialogTitleText: 'FontAwesome Icon Picker',
  dialogCancelText: 'Cancel',
  pickerButtonIconSize: 2,
  iconListIconSize: defaultIconSize,
  name: 'icon',
}
